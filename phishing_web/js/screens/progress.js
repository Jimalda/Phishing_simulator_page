/* ==========================================================================
   screens/progress.js
   Classroom leaderboard (per-browser, see README for sync caveats) with
   CSV export.
   ========================================================================== */

function renderProgress(container, user, navigate) {
  container.innerHTML = "";

  const pad = document.createElement("div");
  const topRow = document.createElement("div");
  topRow.style.display = "flex";
  topRow.style.justifyContent = "space-between";
  topRow.style.alignItems = "flex-start";

  topRow.innerHTML = `
    <div>
      <div class="eyebrow">Standings</div>
      <h1 class="page-title">Leaderboard</h1>
      <p class="page-subtitle" style="margin-bottom: 0;">
        Based on quiz activity in this browser. See the note below if you're
        running this across multiple devices.
      </p>
    </div>
  `;

  const exportBtn = document.createElement("button");
  exportBtn.className = "btn btn-secondary";
  exportBtn.textContent = "Export CSV";
  exportBtn.addEventListener("click", exportCsv);
  topRow.appendChild(exportBtn);

  pad.appendChild(topRow);
  container.appendChild(pad);

  const leaderboard = Storage.getLeaderboard();

  if (leaderboard.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card empty-state";
    empty.textContent = "No quiz attempts yet.";
    pad.appendChild(empty);
    return;
  }

  const tableCard = document.createElement("div");
  tableCard.className = "card";
  tableCard.style.padding = "0";

  const table = document.createElement("table");
  table.className = "leaderboard";
  table.innerHTML = `
    <thead>
      <tr>
        <th>#</th><th>Name</th><th>Answered</th><th>Correct</th><th>Accuracy</th>
      </tr>
    </thead>
  `;
  const tbody = document.createElement("tbody");
  leaderboard.forEach((row, i) => {
    const tr = document.createElement("tr");
    if (row.userId === user.id) tr.classList.add("me");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${escapeHtml(row.name)}</td>
      <td>${row.total}</td>
      <td>${row.correct}</td>
      <td>${row.accuracy.toFixed(0)}%</td>
    `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableCard.appendChild(table);
  pad.appendChild(tableCard);

  const note = document.createElement("p");
  note.className = "muted";
  note.style.fontSize = "12.5px";
  note.style.marginTop = "14px";
  note.textContent =
    "Note: this leaderboard is stored in your browser's local storage. It only " +
    "includes profiles created on this browser/device - it won't automatically " +
    "sync across different computers.";
  pad.appendChild(note);
}

function exportCsv() {
  const csv = Storage.exportLeaderboardCSV();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "phishing_training_leaderboard.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
