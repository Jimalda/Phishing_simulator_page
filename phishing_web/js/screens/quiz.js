/* ==========================================================================
   screens/quiz.js
   "Spot the Phish" - simulated emails, judged legit/phishing, with a
   difficulty picker up front and full explanations after each answer.
   ========================================================================== */

const DIFFICULTY_LABELS = {
  all: "All Difficulties",
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

function renderQuiz(container, user, navigate) {
  container.innerHTML = "";
  const allQuestions = APP_DATA.quizBank;

  const state = {
    questions: [],
    index: 0,
    score: 0,
    difficulty: "all",
  };

  renderSetup();

  function countFor(difficulty) {
    if (difficulty === "all") return allQuestions.length;
    return allQuestions.filter((q) => q.difficulty === difficulty).length;
  }

  function renderSetup() {
    container.innerHTML = "";
    const pad = document.createElement("div");
    pad.innerHTML = `
      <div class="eyebrow">Field Exercise</div>
      <h1 class="page-title">Spot the Phish</h1>
      <p class="page-subtitle">Choose a difficulty level, then judge each simulated email as phishing or legitimate.</p>
    `;
    container.appendChild(pad);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-title">Difficulty</div>
      <p class="muted" style="font-size: 13.5px; margin: 4px 0 16px; max-width: 560px;">
        Easy = obvious red flags. Medium = you need to look closer.
        Hard = subtle, realistic attacks that fool real employees.
      </p>
    `;

    const picker = document.createElement("div");
    picker.className = "difficulty-picker";
    ["all", "easy", "medium", "hard"].forEach((key) => {
      const label = document.createElement("label");
      label.className = "difficulty-option";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "difficulty";
      radio.value = key;
      if (key === "all") radio.checked = true;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(`${DIFFICULTY_LABELS[key]} (${countFor(key)})`));
      picker.appendChild(label);
    });
    card.appendChild(picker);

    const startBtn = document.createElement("button");
    startBtn.className = "btn btn-primary";
    startBtn.textContent = "Start Quiz";
    startBtn.addEventListener("click", () => {
      const chosen = picker.querySelector('input[name="difficulty"]:checked').value;
      startQuiz(chosen);
    });
    card.appendChild(startBtn);

    pad.appendChild(card);
  }

  function startQuiz(difficulty) {
    state.difficulty = difficulty;
    let pool =
      difficulty === "all"
        ? [...allQuestions]
        : allQuestions.filter((q) => q.difficulty === difficulty);
    if (pool.length === 0) return;
    state.questions = shuffleArray(pool);
    state.index = 0;
    state.score = 0;
    buildShell();
    renderQuestion();
  }

  let progressBar, progressLabel, contentHolder;

  function buildShell() {
    container.innerHTML = "";
    const pad = document.createElement("div");

    const topRow = document.createElement("div");
    topRow.style.display = "flex";
    topRow.style.alignItems = "center";
    topRow.style.justifyContent = "space-between";
    topRow.style.marginBottom = "6px";

    const leftGroup = document.createElement("div");
    leftGroup.style.display = "flex";
    leftGroup.style.alignItems = "center";
    leftGroup.style.gap = "14px";
    const h1 = document.createElement("h1");
    h1.className = "page-title";
    h1.style.marginBottom = "0";
    h1.textContent = "Spot the Phish";
    leftGroup.appendChild(h1);

    const changeBtn = document.createElement("button");
    changeBtn.className = "btn btn-secondary";
    changeBtn.textContent = "\u2190 Change Difficulty";
    changeBtn.addEventListener("click", renderSetup);
    leftGroup.appendChild(changeBtn);

    topRow.appendChild(leftGroup);

    progressLabel = document.createElement("div");
    progressLabel.className = "muted";
    progressLabel.style.fontSize = "13.5px";
    topRow.appendChild(progressLabel);

    pad.appendChild(topRow);

    const track = document.createElement("div");
    track.className = "progress-track";
    progressBar = document.createElement("div");
    progressBar.className = "progress-fill";
    track.appendChild(progressBar);
    pad.appendChild(track);

    contentHolder = document.createElement("div");
    pad.appendChild(contentHolder);

    container.appendChild(pad);
  }

  function updateProgress() {
    const pct = (state.index / state.questions.length) * 100;
    progressBar.style.width = `${pct}%`;
    progressLabel.textContent = `Question ${state.index + 1} of ${state.questions.length}   |   Score: ${state.score}`;
  }

  function renderQuestion() {
    if (state.index >= state.questions.length) {
      renderSummary();
      return;
    }
    updateProgress();
    const q = state.questions[state.index];
    contentHolder.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    const badge = document.createElement("span");
    badge.className = `case-tag tag-${q.difficulty}`;
    badge.textContent = q.difficulty.toUpperCase();
    card.appendChild(badge);

    const header = document.createElement("div");
    header.className = "email-header";
    header.style.marginTop = "10px";
    header.innerHTML = `
      <div><span class="email-from">${escapeHtml(q.from_name)}</span><span class="email-addr">&lt;${escapeHtml(q.from_email)}&gt;</span></div>
      <div class="email-subject">${escapeHtml(q.subject)}</div>
    `;
    card.appendChild(header);

    const body = document.createElement("div");
    body.className = "email-body";
    let bodyText = q.body;
    if (q.link_display) bodyText += `\n\n[${q.link_display}]`;
    body.textContent = bodyText;
    card.appendChild(body);

    if (q.link_actual) {
      const linkRow = document.createElement("div");
      linkRow.className = "link-row";
      const inspectBtn = document.createElement("button");
      inspectBtn.className = "btn btn-secondary";
      inspectBtn.textContent = "\uD83D\uDD0D Inspect link (simulates hovering)";
      const revealSpan = document.createElement("span");
      revealSpan.className = "link-reveal";
      inspectBtn.addEventListener("click", () => {
        revealSpan.textContent = `Actual destination: ${q.link_actual}`;
      });
      linkRow.appendChild(inspectBtn);
      linkRow.appendChild(revealSpan);
      card.appendChild(linkRow);
    }

    const answerArea = document.createElement("div");
    answerArea.className = "answer-buttons";

    const phishBtn = document.createElement("button");
    phishBtn.className = "btn btn-danger";
    phishBtn.textContent = "\uD83D\uDEA9 This is Phishing";
    phishBtn.addEventListener("click", () => submitAnswer(true, card, answerArea, q));

    const legitBtn = document.createElement("button");
    legitBtn.className = "btn btn-success";
    legitBtn.textContent = "\u2705 This Looks Legitimate";
    legitBtn.addEventListener("click", () => submitAnswer(false, card, answerArea, q));

    answerArea.appendChild(phishBtn);
    answerArea.appendChild(legitBtn);
    card.appendChild(answerArea);

    contentHolder.appendChild(card);
  }

  function submitAnswer(userSaidPhishing, card, answerArea, q) {
    const correct = userSaidPhishing === q.is_phishing;
    if (correct) state.score++;
    Storage.recordQuizAttempt(user.id, q.id, correct);
    updateProgress();

    answerArea.innerHTML = "";

    const stamp = document.createElement("div");
    stamp.className = `stamp ${correct ? "stamp-safe" : "stamp-phish"}`;
    stamp.style.marginBottom = "12px";
    stamp.textContent = correct ? "Correct" : "Incorrect";
    answerArea.appendChild(stamp);

    const truth = document.createElement("p");
    truth.style.margin = "0 0 12px";
    truth.style.fontWeight = "600";
    truth.textContent = q.is_phishing
      ? "This WAS a phishing attempt."
      : "This was a LEGITIMATE message.";
    answerArea.appendChild(truth);

    if (q.red_flags && q.red_flags.length) {
      const flagTitle = document.createElement("div");
      flagTitle.style.fontWeight = "700";
      flagTitle.style.fontSize = "13.5px";
      flagTitle.textContent = "Red flags in this message:";
      answerArea.appendChild(flagTitle);

      const ul = document.createElement("ul");
      ul.className = "flag-list";
      q.red_flags.forEach((f) => {
        const li = document.createElement("li");
        li.textContent = f;
        ul.appendChild(li);
      });
      answerArea.appendChild(ul);
    }

    const explanation = document.createElement("p");
    explanation.className = "muted";
    explanation.style.fontSize = "13.5px";
    explanation.style.marginBottom = "16px";
    explanation.textContent = q.explanation;
    answerArea.appendChild(explanation);

    const isLast = state.index === state.questions.length - 1;
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-primary";
    nextBtn.textContent = isLast ? "See Results" : "Next Question \u2192";
    nextBtn.addEventListener("click", () => {
      state.index++;
      renderQuestion();
    });
    answerArea.appendChild(nextBtn);
  }

  function renderSummary() {
    progressBar.style.width = "100%";
    progressLabel.textContent = "Complete!";
    contentHolder.innerHTML = "";

    const total = state.questions.length;
    const pct = total ? (state.score / total) * 100 : 0;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-title">Quiz Complete!</div>
      <div class="muted" style="font-size: 13.5px; margin: 2px 0 10px;">Difficulty: ${DIFFICULTY_LABELS[state.difficulty]}</div>
      <div class="stat-value ${pct >= 70 ? "good" : "bad"}" style="margin-bottom: 6px;">${state.score} / ${total} correct (${pct.toFixed(0)}%)</div>
      <p class="muted" style="font-size: 13.5px; margin-bottom: 20px;">
        ${pct >= 90 ? "Excellent! You're spotting these like a pro." :
          pct >= 70 ? "Good work - review the lessons on any questions you missed." :
          "Phishing can fool anyone. Revisit the Lessons tab and try again."}
      </p>
    `;

    const btnRow = document.createElement("div");
    btnRow.style.display = "flex";
    btnRow.style.gap = "10px";

    const retakeBtn = document.createElement("button");
    retakeBtn.className = "btn btn-primary";
    retakeBtn.textContent = "Retake (Same Difficulty)";
    retakeBtn.addEventListener("click", () => startQuiz(state.difficulty));

    const changeBtn = document.createElement("button");
    changeBtn.className = "btn btn-secondary";
    changeBtn.textContent = "Change Difficulty";
    changeBtn.addEventListener("click", renderSetup);

    const lessonsBtn = document.createElement("button");
    lessonsBtn.className = "btn btn-secondary";
    lessonsBtn.textContent = "Review Lessons";
    lessonsBtn.addEventListener("click", () => navigate("lessons"));

    const leaderboardBtn = document.createElement("button");
    leaderboardBtn.className = "btn btn-secondary";
    leaderboardBtn.textContent = "View Leaderboard";
    leaderboardBtn.addEventListener("click", () => navigate("progress"));

    btnRow.appendChild(retakeBtn);
    btnRow.appendChild(changeBtn);
    btnRow.appendChild(lessonsBtn);
    btnRow.appendChild(leaderboardBtn);
    card.appendChild(btnRow);

    contentHolder.appendChild(card);
  }
}
