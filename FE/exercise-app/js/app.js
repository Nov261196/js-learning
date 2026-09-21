import { authView } from "./components/auth-view.js";
import { topbar } from "./components/topbar.js";
import { sidebar } from "./components/sidebar.js";
import { lessonContent, lessonLoading } from "./components/lesson-content.js";
import { codeLab } from "./components/code-lab.js";
import { courseCatalog } from "./components/course-catalog.js";
import { courseLessons, courseModules } from "./data/course-data.js";
import { customSolutions, solutionSources } from "./data/solution-data.js";
import { exercises } from "./data/practice-data.js";
import { currentUser, signIn, signOut, signUp } from "./services/auth-service.js";
import { createProgress, exerciseIds, courseLessonIds, isUnlocked, loadProgress, saveProgress } from "./services/progress-service.js";
import { escapeContent, renderMarkdown } from "./services/markdown-service.js";
import { runJavaScript } from "./services/code-runner.js";

const root = document.querySelector("#app");
let user = null;
let state = createProgress();
let authLoading = true;
let authError = "";
let persistTimer = null;
let mode = "course";
let exerciseIndex = Math.min(state.completed.length, exercises.length - 1);
let activeLesson = findLesson(new URLSearchParams(location.search).get("lesson")) ?? nextLesson();
let consoleText = "Nhấn “Chạy code” để xem kết quả.";
let feedback = "";
let feedbackType = "info";
let lessonContentValue = null;
let viewRequest = 0;

function findLesson(id) {
  return courseLessons.find(lesson => lesson.id === id) ?? null;
}

function nextLesson() {
  return courseLessons.find(lesson => !state.completedLessons.includes(lesson.id) || !areLessonExercisesComplete(lesson.id)) ?? courseLessons.at(-1);
}

function areLessonExercisesComplete(lessonId) {
  const key = `${lessonId}:required-exercises`;
  const count = state.checklists[`${key}:count`];
  if (!Number.isInteger(count) || count < 1) return false;
  const completed = state.checklists[key] ?? {};
  return Array.from({ length: count }, (_, index) => completed[index] === true).every(Boolean);
}

function isCourseLessonUnlocked(lessonId) {
  const index = courseLessonIds.indexOf(lessonId);
  if (index < 0) return false;
  if (index === 0) return true;
  const previousId = courseLessonIds[index - 1];
  return state.completedLessons.includes(previousId) && areLessonExercisesComplete(previousId);
}

function verifiedCourseProgress() {
  const ids = [];
  for (const lesson of courseLessons) {
    if (!state.completedLessons.includes(lesson.id) || !areLessonExercisesComplete(lesson.id)) break;
    ids.push(lesson.id);
  }
  return ids;
}

function moduleForLesson(lesson) {
  return courseModules.find(module => module.id === lesson?.moduleId) ?? courseModules[0];
}

function persist() {
  if (!user) return;
  clearTimeout(persistTimer);
  const userId = user.id;
  const snapshot = structuredClone(state);
  persistTimer = setTimeout(() => {
    saveProgress(userId, snapshot).catch(error => {
      console.error("Could not save progress:", error);
      authError = error.message;
    });
  }, 350);
}

async function flushProgress() {
  clearTimeout(persistTimer);
  persistTimer = null;
  if (user) await saveProgress(user.id, state);
}

function selectedExercise() {
  return exercises[exerciseIndex];
}

function selectedCode() {
  if (mode === "practice") return state.code[selectedExercise().id] ?? selectedExercise().starterCode;
  return state.lessonCode[activeLesson.id] ?? "// Viết code của bạn ở đây\n";
}

function render() {
  if (authLoading) {
    root.innerHTML = `<main class="auth-screen container-fluid d-grid min-vh-100 place-items-center"><div class="text-center"><span class="spinner-border text-warning" role="status" aria-label="Đang kết nối"></span><p class="text-secondary mt-3">Đang kết nối VUDN…</p></div></main>`;
    return;
  }
  if (!user) {
    root.innerHTML = authView();
    if (authError) {
      const message = root.querySelector("[data-auth-message]");
      message.textContent = authError;
      message.classList.add("text-danger");
    }
    return;
  }

  const module = moduleForLesson(activeLesson);
  const moduleIndex = courseModules.indexOf(module);
  const current = mode === "practice" ? selectedExercise() : activeLesson;
  const currentIndex = mode === "practice" ? exerciseIndex : courseLessonIds.indexOf(activeLesson.id);
  const total = mode === "practice" ? exercises.length : courseLessons.length;
  const completed = mode === "practice" ? state.completed.includes(current.id) : state.completedLessons.includes(current.id) && areLessonExercisesComplete(current.id);
  const courseTasks = lessonContentValue?.exercises ?? [];
  const completedTaskCount = courseTasks.filter(task => task.completed).length;
  const allCourseTasksComplete = courseTasks.length > 0 && completedTaskCount === courseTasks.length;
  const currentTaskIndex = mode === "course"
    ? courseTasks.findIndex((_, index) => state.checklists[`${activeLesson.id}:required-exercises`]?.[index] !== true)
    : -1;
  const currentTask = currentTaskIndex >= 0 ? activeLesson.exercises[currentTaskIndex] : null;
  const taskBrief = currentTask
    ? { title: currentTask.title, description: currentTask.description }
    : null;
  const lessonIsUnlocked = mode === "practice" || isCourseLessonUnlocked(activeLesson.id);
  const progressIds = verifiedCourseProgress();
  const nextLabel = mode === "practice"
    ? exerciseIndex === exercises.length - 1 ? "Vào bài học" : "Bài tiếp"
    : completed ? currentIndex === total - 1 ? "Đã xong" : "Bài tiếp" : "Tiếp tục";
  const solution = mode === "practice"
    ? `<pre class="code-sample"><code>${escapeContent(current.solution)}</code></pre><ul>${current.explanation.map(item => `<li>${escapeContent(item)}</li>`).join("")}</ul>`
    : lessonContentValue?.solution ?? "<p>Chưa có lời giải tham khảo.</p>";

  root.innerHTML = `
    ${topbar(user, courseLessons.length, progressIds)}
    <div class="app-layout">
      <div id="sidebarRoot">${sidebar({ mode, module, moduleIndex, lessons: exercises, activeId: mode === "practice" ? current.id : activeLesson.id, state, totalLessons: courseLessons, completedCourseIds: progressIds, isCourseLessonUnlocked })}</div>
      <main id="lessonRoot" class="lesson-column" aria-live="polite">
        ${!lessonIsUnlocked
          ? `<article class="lesson-card card h-100 text-center justify-content-center p-5"><p class="display-5">🔒</p><h2>Bài học chưa được mở khóa</h2><p class="text-secondary">Hoàn thành các bài trước để tiếp tục lộ trình.</p><button class="btn btn-warning align-self-center" type="button" data-go-current>Đến bài đang học</button></article>`
          : mode === "practice"
          ? lessonContent({ mode, exercise: current, position: `${exerciseIndex + 1} / ${total}`, completed })
          : lessonContentValue
            ? lessonContent({ mode, lesson: current, position: `${currentIndex + 1} / ${total}`, completed, content: lessonContentValue })
            : lessonLoading()}
      </main>
      <div id="codeRoot">${lessonIsUnlocked ? codeLab({ value: selectedCode(), output: consoleText, solution, taskBrief, previousDisabled: mode === "practice" ? exerciseIndex === 0 : currentIndex === 0, nextLabel, nextDisabled: mode === "course" && (!completed || currentIndex === total - 1), feedback, feedbackType }) : ""}</div>
    </div>
    ${courseCatalog(courseModules, courseLessons, progressIds)}`;

  if (mode === "course" && lessonIsUnlocked && !lessonContentValue) loadLesson(activeLesson);
}

async function loadLesson(lesson) {
  const requestId = ++viewRequest;
  try {
    if (requestId !== viewRequest || activeLesson.id !== lesson.id) return;
    const module = moduleForLesson(lesson);
    const source = solutionSources[module.id];
    const lessonIndex = module.lessons.indexOf(lesson);
    const solutionFolders = source?.lessons[lessonIndex] ?? [];
    const solutionDocuments = await Promise.all(solutionFolders.map(async folder => {
      try {
        const response = await fetch(`../${source.directory}/${folder}/exercises/SOLUTIONS.md`, { cache: "no-store" });
        return response.ok ? response.text() : "";
      } catch {
        return "";
      }
    }));
    if (requestId !== viewRequest || activeLesson.id !== lesson.id) return;
    const exerciseTasks = lesson.exercises.map(task => ({
      title: task.title,
      purpose: "",
      requirements: renderMarkdown(`1. ${task.description}`),
      file: "",
    }));
    const savedTasks = state.checklists[`${lesson.id}:required-exercises`] ?? {};
    exerciseTasks.forEach((task, index) => { task.completed = savedTasks[index] === true; });
    state.checklists[`${lesson.id}:required-exercises:count`] = exerciseTasks.length;
    persist();
    const sourceSolution = solutionDocuments.filter(Boolean).join("\n\n");
    const solution = customSolutions[lesson.id]
      ? renderMarkdown(customSolutions[lesson.id])
      : sourceSolution
        ? `<p class="text-secondary">Lời giải tham khảo cùng chủ đề. Nếu đề bài dùng dữ liệu khác, hãy áp dụng cách làm rồi thay input.</p>${renderMarkdown(sourceSolution)}`
        : `<p class="text-secondary">Chưa có đáp án riêng cho bài này. Hãy xem ví dụ và cách giải thích bên dưới để tham khảo cách dùng kiến thức.</p>${renderMarkdown(`\`\`\`js\n${lesson.code}\n\`\`\`\n\n${lesson.explanation}`)}`;
    lessonContentValue = {
      purpose: renderMarkdown(lesson.summary),
      projectUse: module.goals.map(text => `<li>${escapeContent(text)}</li>`).join(""),
      requirements: renderMarkdown(lesson.exercises.map(task => `- **${task.title}:** ${task.description}`).join("\n")),
      exercises: exerciseTasks,
      concept: renderMarkdown(`\`\`\`js\n${lesson.code}\n\`\`\`\n\n${lesson.explanation}`),
      hint: renderMarkdown(lesson.explanation),
      solution,
    };
    render();
  } catch (error) {
    if (requestId !== viewRequest) return;
    lessonContentValue = {
      purpose: `<p class="text-danger">${escapeContent(error.message)}</p>`,
      projectUse: "<li>Không tải được tài liệu bài học.</li>",
      requirements: "<p>Kiểm tra lại đường dẫn tài liệu.</p>",
      concept: "<p>Tài liệu chưa tải được.</p>",
      hint: "<p>Kiểm tra Live Server đang chạy từ thư mục learning_code.</p>",
      solution: "<p>Không tải được lời giải.</p>",
    };
    render();
  }
}

function navigatePractice(index) {
  if (index < 0 || index >= exercises.length) return;
  const id = exercises[index].id;
  if (!isUnlocked(exerciseIds, state.completed, id)) return;
  mode = "practice";
  exerciseIndex = index;
  feedback = "";
  consoleText = "Nhấn “Chạy code” để xem kết quả.";
  history.pushState({}, "", "./index.html");
  render();
}

function navigateLesson(id) {
  const lesson = findLesson(id);
  if (!lesson || !isCourseLessonUnlocked(lesson.id)) return;
  mode = "course";
  activeLesson = lesson;
  lessonContentValue = null;
  feedback = "";
  consoleText = "Nhấn “Chạy code” để xem kết quả.";
  history.pushState({}, "", `./index.html?lesson=${encodeURIComponent(lesson.id)}`);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openCatalog() {
  const modal = window.bootstrap?.Modal.getOrCreateInstance(document.querySelector("#courseModal"));
  modal?.show();
}

function saveEditor() {
  const editor = document.querySelector("#codeEditor");
  if (!editor || !user) return;
  if (mode === "practice") state.code[selectedExercise().id] = editor.value;
  else state.lessonCode[activeLesson.id] = editor.value;
  persist();
}

async function runCode(check = false) {
  const editor = document.querySelector("#codeEditor");
  const code = editor?.value ?? "";
  saveEditor();
  const result = mode === "practice"
    ? await runJavaScript(code, check ? selectedExercise().testCode : "return null;")
    : await runJavaScript(code);
  const lines = [...result.logs];
  if (!result.ok) lines.push(result.error);
  feedback = "";
  if (check && result.ok && mode === "practice") {
    const exercise = selectedExercise();
    const missing = exercise.requiredPatterns.find(rule => !new RegExp(rule.pattern, "i").test(code));
    if (missing) {
      lines.push(missing.message);
      feedback = missing.message;
      feedbackType = "danger";
    }
    else if (result.result?.passed) {
      if (!state.completed.includes(exercise.id)) state.completed.push(exercise.id);
      state.completed = exerciseIds.filter(id => state.completed.includes(id));
      lines.push(result.result.message);
      feedback = result.result.message;
      feedbackType = "success";
      persist();
    } else {
      const message = result.result?.message ?? "Code chưa đạt yêu cầu. Hãy kiểm tra lại rồi thử lại.";
      lines.push(message);
      feedback = message;
      feedbackType = "danger";
    }
  } else if (check && result.ok && mode === "course") {
    const tasks = lessonContentValue?.exercises ?? [];
    const completedCount = tasks.filter((_, index) => state.checklists[`${activeLesson.id}:required-exercises`]?.[index] === true).length;
    const remaining = tasks.length - completedCount;
    if (remaining > 0) {
      feedback = `Còn ${remaining} bài chưa đánh dấu. Mở từng dropdown, làm bài rồi tích “Đã hoàn thành bài này”.`;
      feedbackType = "danger";
      lines.push(feedback);
    }
    else if (!containsRunnableCode(code)) {
      feedback = "Hãy viết và chạy code thực hành trong Code Lab trước khi kiểm tra bài.";
      feedbackType = "danger";
      lines.push(feedback);
    }
    else {
      state.completedLessons = normalizeCourseCompletion(activeLesson.id);
      lines.push("Đã ghi nhận bài hoàn thành.");
      feedback = "Thành công! Bài học đã hoàn thành, bạn có thể tiếp tục.";
      feedbackType = "success";
      persist();
    }
  }
  consoleText = lines.length ? lines.join("\n") : "Code chạy xong nhưng chưa có output.";
  if (!result.ok) {
    feedback = "Code gặp lỗi. Hãy xem Console, sửa lỗi rồi thử lại.";
    feedbackType = "danger";
  }
  render();
}

function normalizeCourseCompletion(id) {
  const next = [...state.completedLessons, id];
  return courseLessonIds.slice(0, Math.max(0, courseLessonIds.indexOf(id) + 1)).filter(item => next.includes(item));
}

function containsRunnableCode(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .trim().length > 0;
}

function resetCode() {
  if (!confirm("Xóa code đang viết trong bài này?")) return;
  if (mode === "practice") delete state.code[selectedExercise().id];
  else delete state.lessonCode[activeLesson.id];
  consoleText = "Nhấn “Chạy code” để xem kết quả.";
  persist();
  render();
}

function next() {
  if (mode === "practice") {
    if (exerciseIndex < exercises.length - 1) navigatePractice(exerciseIndex + 1);
    else navigateLesson(courseLessons[0].id);
    return;
  }
  const index = courseLessonIds.indexOf(activeLesson.id);
  if (!state.completedLessons.includes(activeLesson.id) || !areLessonExercisesComplete(activeLesson.id)) return;
  const target = courseLessons[index + 1];
  if (target) navigateLesson(target.id);
  else render();
}

function previous() {
  if (mode === "practice") navigatePractice(exerciseIndex - 1);
  else navigateLesson(courseLessons[courseLessonIds.indexOf(activeLesson.id) - 1]?.id);
}

function resetPracticeProgress() {
  if (!confirm("Xóa tiến độ và code của 4 bài typeof?")) return;
  state.completed = [];
  state.code = {};
  exerciseIndex = 0;
  persist();
  render();
}

root.addEventListener("click", async event => {
  const target = event.target.closest("button, a");
  if (!target) return;
  if (target.matches("[data-auth-tab]")) {
    const tab = target.dataset.authTab;
    document.querySelectorAll("[data-auth-tab]").forEach(button => button.classList.toggle("active", button === target));
    document.querySelectorAll("[data-auth-form]").forEach(form => { form.hidden = form.dataset.authForm !== tab; });
    return;
  }
  if (target.matches("[data-sign-out]")) {
    try {
      await flushProgress();
      await signOut();
    } catch (error) {
      console.error("Could not sign out cleanly:", error);
    }
    user = null;
    state = createProgress();
    render();
    return;
  }
  if (target.matches("[data-open-catalog]")) { openCatalog(); return; }
  if (target.matches("[data-reset-practice-progress]")) { resetPracticeProgress(); return; }
  if (target.matches("[data-select-exercise]")) { navigatePractice(Number(target.dataset.selectExercise)); return; }
  if (target.matches("[data-go-current]")) { navigateLesson(nextLesson().id); return; }
  if (target.matches("[data-select-lesson], [data-open-lesson]")) { event.preventDefault(); window.bootstrap?.Modal.getInstance(document.querySelector("#courseModal"))?.hide(); navigateLesson(target.dataset.selectLesson ?? target.dataset.openLesson); return; }
  if (target.matches("[data-run-code]")) { await runCode(false); return; }
  if (target.matches("[data-check-code]")) { await runCode(true); return; }
  if (target.matches("[data-reset-code]")) { resetCode(); return; }
  if (target.matches("[data-clear-console]")) { consoleText = "Console đã được xóa."; render(); return; }
  if (target.matches("[data-previous]")) { previous(); return; }
  if (target.matches("[data-next]")) { next(); }
});

root.addEventListener("change", event => {
  const checkbox = event.target.closest("input[data-lesson-exercise]");
  if (!checkbox || mode !== "course" || !activeLesson) return;
  const key = `${activeLesson.id}:required-exercises`;
  if (lessonContentValue?.exercises[Number(checkbox.dataset.lessonExercise)]) {
    lessonContentValue.exercises[Number(checkbox.dataset.lessonExercise)].completed = checkbox.checked;
  }
  if (state.completedLessons.includes(activeLesson.id)) {
    const lessonIndex = courseLessonIds.indexOf(activeLesson.id);
    state.completedLessons = courseLessonIds.slice(0, lessonIndex).filter(id => state.completedLessons.includes(id));
  }
  state.checklists[key] ??= {};
  state.checklists[key][checkbox.dataset.lessonExercise] = checkbox.checked;
  persist();
  render();
});

root.addEventListener("submit", async event => {
  const form = event.target.closest("[data-auth-form]");
  if (!form) return;
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  try {
    const authenticatedUser = form.dataset.authForm === "login" ? await signIn(data.email, data.password) : await signUp(data);
    const savedProgress = await loadProgress();
    user = authenticatedUser;
    state = savedProgress;
    authError = "";
    exerciseIndex = Math.min(state.completed.length, exercises.length - 1);
    render();
  } catch (error) {
    const message = root.querySelector("[data-auth-message]");
    message.textContent = error.message;
    message.classList.add("text-danger");
  }
});

root.addEventListener("input", event => {
  if (event.target.id === "codeEditor") saveEditor();
});

window.addEventListener("popstate", () => {
  const requested = new URLSearchParams(location.search).get("lesson");
  if (requested && findLesson(requested)) {
    activeLesson = findLesson(requested);
  } else {
    activeLesson = nextLesson();
  }
  mode = "course";
  lessonContentValue = null;
  render();
});

render();
currentUser()
  .then(async signedInUser => {
    user = signedInUser;
    if (user) state = await loadProgress();
  })
  .catch(error => { authError = error.message; })
  .finally(() => {
    authLoading = false;
    render();
  });
