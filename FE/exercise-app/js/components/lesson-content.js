export function lessonContent({
  mode,
  exercise,
  lesson,
  position,
  completed,
  content = null,
}) {
  const isPractice = mode === "practice";
  const title = isPractice ? exercise.title : lesson.title;
  const purpose = isPractice
    ? `<p>${exercise.purpose}</p>`
    : (content?.purpose ?? "<p>Học và thực hành nội dung của bài học.</p>");
  const projectUse = isPractice
    ? exercise.projectUse.map((item) => `<li>${item}</li>`).join("")
    : (content?.projectUse ??
      "<li>Áp dụng kiến thức của bài trong ứng dụng JavaScript.</li>");
  const concept = isPractice
    ? exercise.concept
    : (content?.concept ?? "<p>Thực hành các khái niệm chính của bài học.</p>");
  const hint = isPractice
    ? `<p>${exercise.hint}</p>`
    : (content?.hint ??
      "<p>Chia yêu cầu thành từng bước nhỏ và kiểm tra output sau mỗi bước.</p>");
  const tasks = isPractice
    ? [{
        title: exercise.title,
        purpose: `<p>${escape(exercise.purpose)}</p>`,
        requirements: `<ol>${exercise.requirements.map((item) => `<li>${escape(item)}</li>`).join("")}</ol>`,
        completed,
      }]
    : (content?.exercises ?? []);
  const tasksComplete =
    tasks.length > 0 && tasks.every((task) => task.completed);
  const status = completed
    ? "Đã hoàn thành"
    : isPractice
      ? "Chưa hoàn thành"
      : "Đang học";

  return `
    <article class="lesson-card card h-100">
      <header class="lesson-heading d-flex justify-content-between align-items-start gap-3">
        <div><p class="eyebrow mb-2">BÀI ${position}</p><h2>${escape(title)}</h2></div>
        <span class="badge rounded-pill lesson-status ${completed ? "is-complete" : ""}">${status}</span>
      </header>
      <section class="purpose-card card mt-4">
        <h3>Bài này để làm gì?</h3>
         ${purpose}
      </section>
      <section class="project-use-card card mt-3"><h3>${isPractice ? "Trong dự án dùng ở đâu?" : "Mục tiêu module"}</h3><ul>${projectUse}</ul></section>
      <section class="required-exercises card mt-4"><header class="d-flex justify-content-between align-items-center gap-3"><div><h3>${isPractice ? "Bài tập" : "Bài tập bắt buộc"}</h3><p class="mb-0">${isPractice ? "Mở bài tập để xem yêu cầu thực hành." : "Mở từng bài và làm theo yêu cầu.<br>Tích hoàn thành từng bài để mở bài tiếp theo."}</p></div>${isPractice ? "" : `<span class="badge ${tasksComplete ? "text-bg-success" : "text-bg-secondary"}">${tasks.filter((task) => task.completed).length}/${tasks.length}</span>`}</header><div class="required-exercise-list">${tasks.map((task, index) => `<details class="required-exercise-dropdown"><summary><span>${escape(task.title)}</span>${isPractice ? "" : `<span class="badge ${task.completed ? "text-bg-success" : "text-bg-secondary"}">${task.completed ? "Đã xong" : "Cần làm"}</span>`}</summary><div class="required-exercise-content">${task.purpose ? `<div class="exercise-purpose">${task.purpose}</div>` : ""}<div class="exercise-requirement">${task.requirements}</div>${task.file ? `<p class="exercise-file">Thực hành tại: <code>${escape(task.file)}</code></p>` : ""}${isPractice ? "" : `<label class="exercise-complete"><input class="form-check-input" type="checkbox" data-lesson-exercise="${index}" ${task.completed ? "checked" : ""}><span>Đã hoàn thành bài này</span></label>`}</div></details>`).join("")}</div></section>
      <details class="concept-card card mt-3"><summary>Kiến thức cần nhớ</summary><div class="details-body">${concept}</div></details>
      <details class="concept-card card mt-3"><summary>Xem gợi ý</summary><div class="details-body">${hint}</div></details>
    </article>`;
}

export function lessonLoading() {
  return `<article class="lesson-card card h-100"><div class="placeholder-glow"><span class="placeholder col-5"></span><span class="placeholder col-8 mt-4"></span><span class="placeholder col-12 mt-3"></span></div></article>`;
}

function escape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
