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
    ? `<p>${escape(exercise.purpose)}</p>`
    : (content?.purpose ?? "<p>Học và thực hành nội dung của bài học.</p>");
  const realWorldUse = isPractice
    ? exercise.projectUse.map((item) => `<li>${escape(item)}</li>`).join("")
    : (content?.realWorldUse ??
      `<li class="text-danger">Áp dụng kiến thức của bài trong ứng dụng JavaScript.</li>`);
  const moduleGoals = isPractice ? "" : (content?.moduleGoals ?? "");
  const concept = isPractice
    ? exercise.concept
    : (content?.concept ?? "<p>Thực hành các khái niệm chính của bài học.</p>");
  const hint = isPractice
    ? `<p>${escape(exercise.hint)}</p>`
    : (content?.hint ??
      "<p>Chia yêu cầu thành từng bước nhỏ và kiểm tra output sau mỗi bước.</p>");
  const tasks = isPractice
    ? [
      {
        title: exercise.title,
        purpose: `<p>${escape(exercise.purpose)}</p>`,
        requirements: `
          <ol>
            ${exercise.requirements
              .map((item) => `<li>${escape(item)}</li>`)
              .join("")}
          </ol>
        `,
        completed,
      },
    ]
    : (content?.exercises ?? []);
  const completedTaskCount = tasks.filter((task) => task.completed).length;
  const tasksComplete = tasks.length > 0 && completedTaskCount === tasks.length;
  const status = completed
    ? "Đã hoàn thành"
    : isPractice
      ? "Chưa hoàn thành"
      : "Đang học";
  const taskTitle = isPractice ? "Bài tập" : "Bài tập bắt buộc";
  const taskDescription = isPractice
    ? "Mở bài tập để xem yêu cầu thực hành."
    : "Làm lần lượt từng bài trong Code Lab.<br>Nhấn Kiểm tra bài để chấm và chuyển sang bài tiếp theo.";
  const taskProgress = isPractice
    ? ""
    : `
      <span class="badge ${tasksComplete ? "text-bg-success" : "text-bg-secondary"}">
        ${completedTaskCount}/${tasks.length}
      </span>
    `;
  const moduleGoalsSection = moduleGoals
    ? `
      <details class="concept-card module-goals-details card mt-3">
        <summary>Mục tiêu module</summary>
        <div class="details-body">
          <ul>${moduleGoals}</ul>
        </div>
      </details>
    `
    : "";
  const currentTaskIndex = tasks.findIndex((task) => !task.completed);
  const taskList = tasks
    .map((task, index) => renderTask(task, index, isPractice, index === currentTaskIndex))
    .join("");

  return /* html */ `
    <article class="lesson-card card h-100">
      <header class="lesson-heading d-flex justify-content-between align-items-start gap-3">
        <div>
          <p class="eyebrow mb-2">BÀI ${position}</p>
          <h2>${escape(title)}</h2>
        </div>
        <span class="badge rounded-pill lesson-status ${completed ? "is-complete" : ""}">
          ${status}
        </span>
      </header>

      <details class="concept-card lesson-purpose-details card mt-4">
        <summary>Bài này để làm gì?</summary>
        <div class="details-body">
          ${purpose}
        </div>
      </details>

      <details class="concept-card lesson-application-details card mt-3">
        <summary>Áp dụng vào thực tế để làm gì?</summary>
        <div class="details-body">
          <ul>${realWorldUse}</ul>
        </div>
      </details>

      ${moduleGoalsSection}

      <section class="required-exercises card mt-4">
        <header class="d-flex justify-content-between align-items-center gap-3">
          <div>
            <h3>${taskTitle}</h3>
            <p class="mb-0">${taskDescription}</p>
          </div>
          ${taskProgress}
        </header>

        <div class="required-exercise-list">
          ${taskList}
        </div>
      </section>

      <details class="concept-card card mt-3">
        <summary>Kiến thức cần nhớ</summary>
        <div class="details-body">${concept}</div>
      </details>

      <details class="concept-card card mt-3">
        <summary>Xem gợi ý</summary>
        <div class="details-body">${hint}</div>
      </details>
    </article>
  `;
}

export function lessonLoading() {
  return /* html */ `
    <article class="lesson-card card h-100">
      <div class="placeholder-glow">
        <span class="placeholder col-5"></span>
        <span class="placeholder col-8 mt-4"></span>
        <span class="placeholder col-12 mt-3"></span>
      </div>
    </article>
  `;
}

function renderTask(task, index, isPractice, isCurrent) {
  const statusBadge = isPractice
    ? ""
    : `
      <span class="badge ${task.completed ? "text-bg-success" : isCurrent ? "text-bg-warning" : "text-bg-secondary"}">
        ${task.completed ? "Đã xong" : isCurrent ? "Đang làm" : "Chưa mở"}
      </span>
    `;
  const purpose = task.purpose
    ? `<div class="exercise-purpose">${task.purpose}</div>`
    : "";
  const file = task.file
    ? `<p class="exercise-file">Thực hành tại: <code>${escape(task.file)}</code></p>`
    : "";
  const taskInstruction = isPractice
    ? ""
    : task.completed
      ? `<p class="exercise-check-message text-success mb-0">✓ Bài này đã được kiểm tra.</p>`
      : isCurrent
        ? task.answerType === "theory"
          ? `<p class="exercise-check-message text-warning mb-0">Viết câu trả lời bằng comment <code>// ...</code> trong Code Lab rồi nhấn “Kiểm tra bài”.</p>`
          : `<p class="exercise-check-message text-warning mb-0">Viết code trong Code Lab rồi nhấn “Kiểm tra bài”.</p>`
        : `<p class="exercise-check-message mb-0">Hoàn thành bài trước để mở bài này.</p>`;

  return /* html */ `
    <details class="required-exercise-dropdown" ${isCurrent ? "open" : ""}>
      <summary>
        <span>${escape(task.title)}</span>
        ${statusBadge}
      </summary>
      <div class="required-exercise-content">
        ${purpose}
        <div class="exercise-requirement">${task.requirements}</div>
        ${file}
        ${taskInstruction}
      </div>
    </details>
  `;
}

function escape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
