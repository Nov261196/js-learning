export function sidebar({ mode, module, moduleIndex, lessons, activeId, state, totalLessons, completedCourseIds = [], isCourseLessonUnlocked }) {
  const isPractice = mode === "practice";
  const title = isPractice ? "Data Types & typeof" : module.title;
  const description = isPractice
    ? "Hiểu kiểu dữ liệu bằng cách dự đoán, chạy code và kiểm tra kết quả."
    : module.description;
  const entries = isPractice
    ? lessons.map((item, index) => {
      const done = state.completed.includes(item.id);
      const unlocked = index === 0 || state.completed.includes(lessons[index - 1].id);
      return lessonButton(item.id, item.title, index, item.id === activeId, done, unlocked, "exercise");
    }).join("")
    : module.lessons.map((lesson, index) => {
      const id = `${module.id}/${lesson.id}`;
      const globalIndex = totalLessons.findIndex(lesson => lesson.id === id);
      const done = completedCourseIds.includes(id);
      const unlocked = isCourseLessonUnlocked?.(id) ?? globalIndex === 0;
      return lessonButton(id, lesson.title, index, id === activeId, done, unlocked, "lesson");
    }).join("");
  const completed = completedCourseIds.length;
  const total = totalLessons.length;
  const percent = Math.round((completed / total) * 100);

  return `
    <aside class="app-sidebar d-flex flex-column p-3 p-xl-4">
      <p class="eyebrow">MODULE ${String(moduleIndex + 1).padStart(2, "0")}</p>
      <h1 class="sidebar-title">${escape(title)}</h1>
      <p class="sidebar-description">${escape(description)}</p>
      <nav class="lesson-navigation mt-4" aria-label="Bài học"><ol class="list-unstyled vstack gap-2">${entries}</ol></nav>
      <section class="progress-card card mt-auto p-3">
        <div class="d-flex justify-content-between"><span>Tiến độ khóa học</span><strong>${percent}%</strong></div>
        <div class="progress my-2" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="width:${percent}%"></div></div>
        <p class="small text-secondary mb-3">${completed} / ${total} bài hoàn thành</p>
        <button class="btn btn-outline-light w-100" type="button" data-open-catalog>Xem Thêm</button>
      </section>
      ${isPractice ? `<button class="btn btn-outline-light w-100 mt-3" type="button" data-reset-practice-progress>Xóa tiến độ bài typeof</button>` : ""}
    </aside>`;
}

function lessonButton(id, title, index, active, done, unlocked, type) {
  const action = type === "exercise" ? "data-select-exercise" : "data-select-lesson";
  const actionValue = type === "exercise" ? index : escape(id);
  return `<li><button class="lesson-nav-item list-group-item list-group-item-action ${active ? "active" : ""}" type="button" ${action}="${actionValue}" ${unlocked ? "" : "disabled"}><span class="lesson-number">${String(index + 1).padStart(2, "0")}</span><span class="lesson-nav-title">${escape(title)}</span><span class="lesson-state">${done ? "✓" : unlocked ? "" : "🔒"}</span></button></li>`;
}

function escape(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
