/* ==========================================================================
   screens/dashboard.js
   Home screen: welcomes the user, shows quick stats, and surfaces
   "Why This Matters" sourced statistics.
   ========================================================================== */

function renderDashboard(container, user, navigate) {
  container.innerHTML = "";

  const pad = document.createElement("div");

  pad.innerHTML = `
    <div class="eyebrow">Case Overview</div>
    <h1 class="page-title">Welcome back, ${escapeHtml(user.name)}</h1>
    <p class="page-subtitle">Here's where you stand. Every module makes you harder to trick.</p>
  `;
  container.appendChild(pad);

  // ---- Stat row ----
  const lessons = APP_DATA.lessons;
  const completed = Storage.getCompletedLessons(user.id);
  const lessonPct = lessons.length ? Math.round((completed.size / lessons.length) * 100) : 0;
  const quizStats = Storage.getUserStats(user.id);
  const vishingStats = Storage.getVishingStats(user.id);

  const statRow = document.createElement("div");
  statRow.className = "card-row";
  statRow.style.marginBottom = "24px";

  statRow.appendChild(
    statCard("Lessons Completed", `${completed.size} / ${lessons.length}`, `${lessonPct}%`)
  );
  statRow.appendChild(
    statCard(
      "Quiz Accuracy",
      `${quizStats.accuracy.toFixed(0)}%`,
      `${quizStats.total} answered`,
      quizStats.total ? (quizStats.accuracy >= 70 ? "good" : "bad") : null
    )
  );
  statRow.appendChild(
    statCard(
      "Calls Handled Safely",
      `${vishingStats.safe} / ${vishingStats.total}`,
      "scenarios attempted",
      vishingStats.total
        ? (vishingStats.safe === vishingStats.total ? "good" : null)
        : null
    )
  );
  pad.appendChild(statRow);

  // ---- Action cards ----
  const actionRow = document.createElement("div");
  actionRow.className = "card-row";
  actionRow.style.marginBottom = "30px";

  actionRow.appendChild(
    actionCard(
      "Continue Learning",
      "Review the red flags of phishing and the different attack styles.",
      "Go to Lessons",
      () => navigate("lessons")
    )
  );
  actionRow.appendChild(
    actionCard(
      "Test Yourself",
      "Jump into the Spot-the-Phish quiz with realistic simulated emails.",
      "Start Quiz",
      () => navigate("quiz")
    )
  );
  actionRow.appendChild(
    actionCard(
      "Answer a Call",
      "Handle a live-feeling vishing call and see how you do under pressure.",
      "Take a Call",
      () => navigate("vishing")
    )
  );
  pad.appendChild(actionRow);

  // ---- Why This Matters ----
  const section = document.createElement("div");
  section.innerHTML = `
    <h2 class="page-title" style="font-size: 20px;">Why This Matters</h2>
    <p class="page-subtitle">This isn't hypothetical. A few numbers from recent industry security reports:</p>
  `;
  const factRow = document.createElement("div");
  factRow.className = "card-row";

  const allStats = APP_DATA.stats;
  const picked = sampleArray(allStats, Math.min(4, allStats.length));
  picked.forEach((stat) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="stat-fact-value">${escapeHtml(stat.stat)}</div>
      <div class="muted" style="font-size: 13.5px; margin-top: 6px;">${escapeHtml(stat.text)}</div>
      <div class="stat-fact-source">— ${escapeHtml(stat.source)}</div>
    `;
    factRow.appendChild(card);
  });
  section.appendChild(factRow);
  pad.appendChild(section);
}

function statCard(label, value, sub, highlight) {
  const card = document.createElement("div");
  card.className = "card";
  const valueClass = highlight === "good" ? "good" : highlight === "bad" ? "bad" : "";
  card.innerHTML = `
    <div class="muted" style="font-size: 13px;">${escapeHtml(label)}</div>
    <div class="stat-value ${valueClass}">${escapeHtml(value)}</div>
    <div class="muted" style="font-size: 12.5px;">${escapeHtml(sub || "")}</div>
  `;
  return card;
}

function actionCard(title, desc, btnText, onClick) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-title">${escapeHtml(title)}</div>
    <p class="muted" style="font-size: 13.5px; margin: 6px 0 14px;">${escapeHtml(desc)}</p>
  `;
  const btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.textContent = btnText;
  btn.addEventListener("click", onClick);
  card.appendChild(btn);
  return card;
}
