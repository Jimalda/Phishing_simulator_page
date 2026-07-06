/* ==========================================================================
   screens/lessons.js
   Lesson list + reader with completion tracking.
   ========================================================================== */

function renderLessons(container, user, navigate) {
  container.innerHTML = "";
  const lessons = APP_DATA.lessons;
  let selectedIndex = 0;

  const pad = document.createElement("div");
  pad.innerHTML = `
    <div class="eyebrow">Training Module</div>
    <h1 class="page-title">Lessons</h1>
  `;
  container.appendChild(pad);

  const layout = document.createElement("div");
  layout.className = "lessons-layout";
  layout.style.marginTop = "18px";
  pad.appendChild(layout);

  const listEl = document.createElement("div");
  listEl.className = "lesson-list";
  layout.appendChild(listEl);

  const detailOuter = document.createElement("div");
  detailOuter.className = "lesson-detail card";
  layout.appendChild(detailOuter);

  function renderList() {
    const completed = Storage.getCompletedLessons(user.id);
    listEl.innerHTML = "";
    lessons.forEach((lesson, i) => {
      const btn = document.createElement("button");
      btn.className = "lesson-list-item" + (i === selectedIndex ? " active" : "");
      const mark = completed.has(lesson.id) ? "\u2713 " : "\u25CB ";
      btn.textContent = mark + lesson.title;
      btn.addEventListener("click", () => {
        selectedIndex = i;
        renderList();
        renderDetail();
      });
      listEl.appendChild(btn);
    });
  }

  function renderDetail() {
    const lesson = lessons[selectedIndex];
    const completed = Storage.getCompletedLessons(user.id);
    const isDone = completed.has(lesson.id);

    detailOuter.innerHTML = `
      <div class="card-title">${escapeHtml(lesson.title)}</div>
      <p class="muted" style="font-size: 13.5px; margin: 4px 0 0;">${escapeHtml(lesson.summary)}</p>
      <div class="lesson-body">${escapeHtml(lesson.content)}</div>
    `;

    const btn = document.createElement("button");
    btn.className = isDone ? "btn btn-secondary" : "btn btn-primary";
    btn.textContent = isDone ? "Completed \u2713" : "Mark as Complete";
    btn.addEventListener("click", () => {
      Storage.markLessonComplete(user.id, lesson.id);
      renderList();
      renderDetail();
    });
    detailOuter.appendChild(btn);
  }

  renderList();
  renderDetail();
}
