/* ==========================================================================
   screens/vishing.js
   Branching phone-call simulator. Caller speaks, user picks a response,
   tree unfolds to a safe/partial/compromised ending with a debrief.
   ========================================================================== */

const OUTCOME_LABELS = {
  safe: ["Call Handled Safely", "stamp-safe"],
  partial: ["Partially Compromised", "stamp-partial"],
  compromised: ["Compromised", "stamp-compromised"],
};

function renderVishing(container, user, navigate) {
  const scenarios = APP_DATA.vishingScenarios;
  let currentScenario = null;
  let currentNodeId = null;
  let transcriptEl, optionArea;

  renderSetup();

  function renderSetup() {
    container.innerHTML = "";
    const pad = document.createElement("div");
    pad.innerHTML = `
      <div class="eyebrow">Field Exercise</div>
      <h1 class="page-title">Social Engineering Call Simulator</h1>
      <p class="page-subtitle">
        You'll get a phone call. Pick how you respond at each step - there's no time to
        "hover over a link" here, just judgment calls in the moment.
      </p>
    `;
    container.appendChild(pad);

    const historyByScenario = {};
    Storage.getVishingHistory(user.id).forEach((h) => {
      if (!(h.scenarioId in historyByScenario)) historyByScenario[h.scenarioId] = h.outcome;
    });

    scenarios.forEach((scenario) => {
      const card = document.createElement("div");
      card.className = "card scenario-card";

      const top = document.createElement("div");
      top.className = "scenario-card-top";

      const badge = document.createElement("span");
      badge.className = `case-tag tag-${scenario.difficulty}`;
      badge.textContent = scenario.difficulty.toUpperCase();
      top.appendChild(badge);

      const lastOutcome = historyByScenario[scenario.id];
      if (lastOutcome) {
        const [label, stampClass] = OUTCOME_LABELS[lastOutcome];
        const span = document.createElement("span");
        span.className = "last-attempt";
        span.style.color =
          stampClass === "stamp-safe" ? "var(--accent-dark)" :
          stampClass === "stamp-partial" ? "var(--warn)" : "var(--alert)";
        span.textContent = `Last attempt: ${label}`;
        top.appendChild(span);
      }
      card.appendChild(top);

      const title = document.createElement("div");
      title.className = "card-title";
      title.style.marginTop = "8px";
      title.textContent = scenario.title;
      card.appendChild(title);

      const caller = document.createElement("div");
      caller.className = "muted";
      caller.style.fontSize = "13px";
      caller.textContent = `Caller: ${scenario.caller_name}`;
      card.appendChild(caller);

      const intro = document.createElement("p");
      intro.className = "muted";
      intro.style.fontSize = "13.5px";
      intro.style.margin = "6px 0 12px";
      intro.textContent = scenario.intro;
      card.appendChild(intro);

      const btn = document.createElement("button");
      btn.className = "btn btn-primary";
      btn.textContent = "Answer the Call";
      btn.addEventListener("click", () => startScenario(scenario));
      card.appendChild(btn);

      pad.appendChild(card);
    });
  }

  function startScenario(scenario) {
    currentScenario = scenario;
    currentNodeId = scenario.start_node;

    container.innerHTML = "";
    const pad = document.createElement("div");

    const topRow = document.createElement("div");
    topRow.className = "call-header";
    topRow.innerHTML = `<h1 class="page-title" style="margin-bottom:0; font-size: 22px;">\uD83D\uDCDE Incoming call: ${escapeHtml(scenario.caller_name)}</h1>`;

    const changeBtn = document.createElement("button");
    changeBtn.className = "btn btn-secondary";
    changeBtn.textContent = "\u2190 Choose a Different Scenario";
    changeBtn.addEventListener("click", renderSetup);
    topRow.appendChild(changeBtn);

    pad.appendChild(topRow);

    const card = document.createElement("div");
    card.className = "card";
    card.style.padding = "0";

    transcriptEl = document.createElement("div");
    transcriptEl.className = "transcript";
    card.appendChild(transcriptEl);
    pad.appendChild(card);

    optionArea = document.createElement("div");
    optionArea.style.marginTop = "16px";
    pad.appendChild(optionArea);

    container.appendChild(pad);
    renderNode();
  }

  function appendTranscript(speakerClass, speakerLabel, text) {
    const line = document.createElement("div");
    line.className = "transcript-line";
    const speaker = document.createElement("div");
    speaker.className = `transcript-speaker ${speakerClass}`;
    speaker.textContent = speakerLabel;
    const body = document.createElement("div");
    body.textContent = text;
    line.appendChild(speaker);
    line.appendChild(body);
    transcriptEl.appendChild(line);
    transcriptEl.scrollTop = transcriptEl.scrollHeight;
  }

  function renderNode() {
    const node = currentScenario.nodes[currentNodeId];
    optionArea.innerHTML = "";

    if (node.ending) {
      if (node.closing_line) {
        appendTranscript("caller", currentScenario.caller_name, node.closing_line);
      }
      renderDebrief(node);
      return;
    }

    appendTranscript("caller", currentScenario.caller_name, node.caller_line);

    const list = document.createElement("div");
    list.className = "option-list";
    node.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt.text;
      btn.addEventListener("click", () => chooseOption(opt));
      list.appendChild(btn);
    });
    optionArea.appendChild(list);
  }

  function chooseOption(option) {
    appendTranscript("you", "You", option.text);
    optionArea.innerHTML = "";

    const noteBox = document.createElement("div");
    noteBox.className = "note-box";
    noteBox.textContent = option.note || "";
    optionArea.appendChild(noteBox);

    const continueBtn = document.createElement("button");
    continueBtn.className = "btn btn-primary";
    continueBtn.textContent = "Continue Call \u2192";
    continueBtn.addEventListener("click", () => {
      currentNodeId = option.next;
      renderNode();
    });
    optionArea.appendChild(continueBtn);
  }

  function renderDebrief(node) {
    Storage.recordVishingAttempt(user.id, currentScenario.id, node.outcome);

    const [label, stampClass] = OUTCOME_LABELS[node.outcome];

    const card = document.createElement("div");
    card.className = "card";

    const stamp = document.createElement("div");
    stamp.className = `stamp ${stampClass}`;
    stamp.style.marginBottom = "14px";
    stamp.textContent = label;
    card.appendChild(stamp);

    const summary = document.createElement("p");
    summary.className = "muted";
    summary.style.fontSize = "14px";
    summary.style.marginBottom = "16px";
    summary.textContent = node.summary;
    card.appendChild(summary);

    if (node.tactics_used && node.tactics_used.length) {
      card.appendChild(debriefSection("Tactics the caller used:", node.tactics_used, "var(--ink)"));
    }
    if (node.right && node.right.length) {
      card.appendChild(debriefSection("What you did right:", node.right, "var(--accent-dark)"));
    }
    if (node.improve && node.improve.length) {
      card.appendChild(debriefSection("What to do differently:", node.improve, "var(--alert)"));
    }

    const btnRow = document.createElement("div");
    btnRow.style.display = "flex";
    btnRow.style.gap = "10px";
    btnRow.style.marginTop = "8px";
    btnRow.style.flexWrap = "wrap";

    const retryBtn = document.createElement("button");
    retryBtn.className = "btn btn-primary";
    retryBtn.textContent = "Retry This Scenario";
    retryBtn.addEventListener("click", () => startScenario(currentScenario));

    const otherBtn = document.createElement("button");
    otherBtn.className = "btn btn-secondary";
    otherBtn.textContent = "Try Another Scenario";
    otherBtn.addEventListener("click", renderSetup);

    const dashBtn = document.createElement("button");
    dashBtn.className = "btn btn-secondary";
    dashBtn.textContent = "Back to Dashboard";
    dashBtn.addEventListener("click", () => navigate("dashboard"));

    btnRow.appendChild(retryBtn);
    btnRow.appendChild(otherBtn);
    btnRow.appendChild(dashBtn);
    card.appendChild(btnRow);

    optionArea.appendChild(card);
  }

  function debriefSection(title, items, color) {
    const wrap = document.createElement("div");
    wrap.style.marginBottom = "14px";
    const heading = document.createElement("div");
    heading.style.fontWeight = "700";
    heading.style.fontSize = "13.5px";
    heading.style.marginBottom = "4px";
    heading.textContent = title;
    wrap.appendChild(heading);
    const ul = document.createElement("ul");
    ul.style.margin = "0";
    ul.style.paddingLeft = "20px";
    ul.style.fontSize = "13.5px";
    ul.style.color = color;
    items.forEach((t) => {
      const li = document.createElement("li");
      li.style.marginBottom = "4px";
      li.textContent = t;
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
    return wrap;
  }
}
