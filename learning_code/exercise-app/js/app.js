import { exercises } from "./exercises.js";
import { courseLessons, courseModules } from "./course.js";
import { getCurrentUser, login, logout, register } from "./auth.js";
import {
  completeItem,
  isItemUnlocked,
  normalizeSequentialProgress,
  uncompleteItemAndFollowing,
} from "./progress.js";

const LEGACY_STORAGE_KEY = "javascript-practice-lab-v1";
const LEGACY_CLAIM_KEY = "javascript-practice-legacy-claimed-v1";
const USER_STORAGE_PREFIX = "javascript-practice-progress-v2";
const DATA_TYPES_LESSON_ID = "module-01-fundamentals/02-data-types";
const exerciseIds = exercises.map(exercise => exercise.id);
const courseLessonIds = courseLessons.map(lesson => lesson.id);

const elements = {
  authView: document.querySelector("#authView"),
  topbar: document.querySelector("#topbar"),
  appShell: document.querySelector("#appShell"),
  loginTab: document.querySelector("#loginTab"),
  registerTab: document.querySelector("#registerTab"),
  loginForm: document.querySelector("#loginForm"),
  registerForm: document.querySelector("#registerForm"),
  authMessage: document.querySelector("#authMessage"),
  userName: document.querySelector("#userName"),
  dropdownUserName: document.querySelector("#dropdownUserName"),
  dropdownUserEmail: document.querySelector("#dropdownUserEmail"),
  accountMenuButton: document.querySelector("#accountMenuButton"),
  accountDropdownMenu: document.querySelector("#accountDropdownMenu"),
  logoutButton: document.querySelector("#logoutButton"),
  exerciseList: document.querySelector("#exerciseList"),
  exerciseNumber: document.querySelector("#exerciseNumber"),
  exerciseTitle: document.querySelector("#exerciseTitle"),
  exercisePurpose: document.querySelector("#exercisePurpose"),
  projectUseList: document.querySelector("#projectUseList"),
  requirementsList: document.querySelector("#requirementsList"),
  conceptContent: document.querySelector("#conceptContent"),
  exerciseHint: document.querySelector("#exerciseHint"),
  exerciseStatus: document.querySelector("#exerciseStatus"),
  codeEditor: document.querySelector("#codeEditor"),
  consoleOutput: document.querySelector("#consoleOutput"),
  feedback: document.querySelector("#feedback"),
  solutionPanel: document.querySelector("#solutionPanel"),
  solutionCode: document.querySelector("#solutionCode"),
  solutionExplanation: document.querySelector("#solutionExplanation"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  runButton: document.querySelector("#runButton"),
  checkButton: document.querySelector("#checkButton"),
  clearConsoleButton: document.querySelector("#clearConsoleButton"),
  resetCodeButton: document.querySelector("#resetCodeButton"),
  resetProgressButton: document.querySelector("#resetProgressButton"),
  previousButton: document.querySelector("#previousButton"),
  nextButton: document.querySelector("#nextButton"),
  coursePercent: document.querySelector("#coursePercent"),
  headerCoursePercent: document.querySelector("#headerCoursePercent"),
  courseProgressBar: document.querySelector("#courseProgressBar"),
  courseProgressText: document.querySelector("#courseProgressText"),
  openCourseButton: document.querySelector("#openCourseButton"),
  viewCourseButton: document.querySelector("#viewCourseButton"),
  courseDialog: document.querySelector("#courseDialog"),
  closeCourseButton: document.querySelector("#closeCourseButton"),
  dialogProgressText: document.querySelector("#dialogProgressText"),
  dialogProgressBar: document.querySelector("#dialogProgressBar"),
  courseModuleList: document.querySelector("#courseModuleList"),
};

let currentUser = null;
let state = createEmptyState();

function createEmptyState() {
  return {
    currentIndex: 0,
    completed: [],
    completedLessons: [],
    code: {},
  };
}

function storageKey(userId) {
  return `${USER_STORAGE_PREFIX}:${userId}`;
}

function loadState(userId) {
  try {
    const ownSaved = localStorage.getItem(storageKey(userId));
    const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY);
    const legacyClaimed = localStorage.getItem(LEGACY_CLAIM_KEY);
    const canClaimLegacy = !ownSaved && legacySaved && !legacyClaimed;
    const saved = JSON.parse(ownSaved ?? (canClaimLegacy ? legacySaved : "null"));
    if (canClaimLegacy) localStorage.setItem(LEGACY_CLAIM_KEY, userId);

    const loadedState = {
      currentIndex: Number.isInteger(saved?.currentIndex) ? saved.currentIndex : 0,
      completed: normalizeSequentialProgress(
        exerciseIds,
        Array.isArray(saved?.completed) ? saved.completed : [],
      ),
      completedLessons: normalizeSequentialProgress(
        courseLessonIds,
        Array.isArray(saved?.completedLessons) ? saved.completedLessons : [],
      ),
      code: saved?.code && typeof saved.code === "object" ? saved.code : {},
    };
    const requestedExercise = exerciseIds[loadedState.currentIndex];
    if (!isItemUnlocked(exerciseIds, loadedState.completed, requestedExercise)) {
      loadedState.currentIndex = Math.min(loadedState.completed.length, exercises.length - 1);
    }
    return loadedState;
  } catch {
    return createEmptyState();
  }
}

function saveState() {
  if (!currentUser) return;
  localStorage.setItem(storageKey(currentUser.id), JSON.stringify(state));
}

function showAuth(mode = "login") {
  elements.authView.hidden = false;
  elements.topbar.hidden = true;
  elements.appShell.hidden = true;
  switchAuthMode(mode);
}

function showLearningApp(user) {
  currentUser = user;
  state = loadState(user.id);
  syncInteractiveLesson();
  state.currentIndex = Math.min(Math.max(state.currentIndex, 0), exercises.length - 1);
  elements.authView.hidden = true;
  elements.topbar.hidden = false;
  elements.appShell.hidden = false;
  elements.userName.textContent = user.name;
  elements.dropdownUserName.textContent = user.name;
  elements.dropdownUserEmail.textContent = user.email;
  saveState();
  renderExercise();
  renderCourseDialog();
}

function switchAuthMode(mode) {
  const isLogin = mode === "login";
  elements.loginTab.classList.toggle("active", isLogin);
  elements.registerTab.classList.toggle("active", !isLogin);
  elements.loginTab.setAttribute("aria-selected", String(isLogin));
  elements.registerTab.setAttribute("aria-selected", String(!isLogin));
  elements.loginForm.hidden = !isLogin;
  elements.registerForm.hidden = isLogin;
  elements.authMessage.textContent = "";
  elements.authMessage.className = "auth-message";
}

function setAuthMessage(message, type = "error") {
  elements.authMessage.textContent = message;
  elements.authMessage.className = `auth-message ${type}`;
}

function formValues(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function currentExercise() {
  return exercises[state.currentIndex];
}

function renderNavigation() {
  elements.exerciseList.innerHTML = exercises
    .map((exercise, index) => {
      const isActive = index === state.currentIndex;
      const isCompleted = state.completed.includes(exercise.id);
      const isUnlocked = isItemUnlocked(exerciseIds, state.completed, exercise.id);
      return `
        <li class="exercise-item">
          <button
            type="button"
            data-index="${index}"
            class="${isActive ? "active" : ""} ${isUnlocked ? "" : "locked"}"
            ${isUnlocked ? "" : "disabled"}
            aria-label="${isUnlocked ? exercise.title : `${exercise.title} - chưa mở khóa`}"
          >
            <span class="exercise-index">${index + 1}</span>
            <span>${exercise.title}</span>
            <span class="exercise-check">${isCompleted ? "✓" : isUnlocked ? "" : "🔒"}</span>
          </button>
        </li>`;
    })
    .join("");
}

function renderExerciseProgress() {
  const completedCount = state.completed.length;
  const percent = (completedCount / exercises.length) * 100;
  elements.progressText.textContent = `${completedCount} / ${exercises.length} bài typeof hoàn thành`;
  elements.progressBar.style.width = `${percent}%`;
}

function getCourseProgress() {
  state.completedLessons = normalizeSequentialProgress(courseLessonIds, state.completedLessons);
  const completed = state.completedLessons.length;
  const total = courseLessons.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent };
}

function renderCourseProgress() {
  const { completed, total, percent } = getCourseProgress();
  elements.coursePercent.textContent = `${percent}%`;
  elements.headerCoursePercent.textContent = `${percent}%`;
  elements.openCourseButton
    .querySelector(".course-progress-ring")
    .style.setProperty("--course-progress", `${percent * 3.6}deg`);
  elements.courseProgressBar.style.width = `${percent}%`;
  elements.courseProgressText.textContent = `${completed} / ${total} bài hoàn thành`;
  elements.dialogProgressText.textContent = `${completed} / ${total} bài hoàn thành · ${percent}%`;
  elements.dialogProgressBar.style.width = `${percent}%`;
}

function renderCourseDialog(preferredOpenModuleId) {
  const nextLesson = courseLessons[state.completedLessons.length];
  const defaultOpenModuleId = preferredOpenModuleId ?? nextLesson?.moduleId ?? courseModules.at(-1)?.id;

  elements.courseModuleList.innerHTML = courseModules
    .map((module, moduleIndex) => {
      const completedCount = module.lessons.filter(([lessonId]) =>
        state.completedLessons.includes(`${module.id}/${lessonId}`),
      ).length;
      const firstLessonId = `${module.id}/${module.lessons[0][0]}`;
      const isModuleUnlocked = isItemUnlocked(courseLessonIds, state.completedLessons, firstLessonId);
      const shouldOpen = isModuleUnlocked && module.id === defaultOpenModuleId;
      const lessons = module.lessons
        .map(([lessonId, lessonTitle]) => {
          const fullId = `${module.id}/${lessonId}`;
          const isCompleted = state.completedLessons.includes(fullId);
          const isUnlocked = isItemUnlocked(courseLessonIds, state.completedLessons, fullId);
          const isInteractiveLesson = fullId === DATA_TYPES_LESSON_ID;
          return `
            <li class="course-lesson ${isUnlocked ? "" : "locked"}">
              <input
                id="lesson-${fullId}"
                type="checkbox"
                data-lesson-id="${fullId}"
                ${isCompleted ? "checked" : ""}
                ${isUnlocked && !isInteractiveLesson ? "" : "disabled"}
              />
              <label for="lesson-${fullId}">${lessonTitle}</label>
              ${isInteractiveLesson && isUnlocked && !isCompleted
              ? `<button class="lesson-practice-button" type="button" data-open-practice>Làm 4 bài</button>`
              : isInteractiveLesson && isCompleted
                ? `<span class="lesson-complete-label">Đã vượt qua</span>`
                : isUnlocked
                  ? `<a href="./course.html?lesson=${encodeURIComponent(fullId)}">Học bài</a>`
                  : `<span class="lesson-lock" title="Hoàn thành bài trước để mở khóa">🔒</span>`}
            </li>`;
        })
        .join("");

      return `
        <details
          class="course-module ${isModuleUnlocked ? "" : "locked"}"
          data-module-id="${module.id}"
          data-locked="${!isModuleUnlocked}"
          ${shouldOpen ? "open" : ""}
        >
          <summary aria-disabled="${!isModuleUnlocked}">
            <span>Module ${String(moduleIndex + 1).padStart(2, "0")} · ${module.title}</span>
            <span class="module-summary-status">
              <span class="module-count">${completedCount}/${module.lessons.length}</span>
              ${isModuleUnlocked ? "" : `<span class="module-lock">🔒</span>`}
            </span>
          </summary>
          <ul class="course-lessons">${lessons}</ul>
        </details>`;
    })
    .join("");
  renderCourseProgress();
}

function renderExercise() {
  const exercise = currentExercise();
  const isCompleted = state.completed.includes(exercise.id);

  elements.exerciseNumber.textContent = `Bài ${state.currentIndex + 1} / ${exercises.length}`;
  elements.exerciseTitle.textContent = exercise.title;
  elements.exercisePurpose.textContent = exercise.purpose;
  elements.projectUseList.innerHTML = exercise.projectUse.map(item => `<li>${item}</li>`).join("");
  elements.requirementsList.innerHTML = exercise.requirements
    .map(requirement => `<li>${requirement}</li>`)
    .join("");
  elements.conceptContent.innerHTML = exercise.concept;
  elements.exerciseHint.textContent = exercise.hint;
  elements.exerciseStatus.textContent = isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành";
  elements.exerciseStatus.classList.toggle("completed", isCompleted);
  elements.codeEditor.value = state.code[exercise.id] ?? exercise.starterCode;
  elements.consoleOutput.textContent = "Nhấn “Chạy code” để xem kết quả.";
  elements.feedback.hidden = true;
  elements.solutionPanel.open = false;
  elements.solutionCode.textContent = exercise.solution;
  elements.solutionExplanation.innerHTML = `<ul>${exercise.explanation
    .map(item => `<li>${item}</li>`)
    .join("")}</ul>`;
  elements.previousButton.disabled = state.currentIndex === 0;
  const nextExercise = exercises[state.currentIndex + 1];
  const isCurrentCompleted = state.completed.includes(exercise.id);
  if (nextExercise) {
    elements.nextButton.textContent = "Bài tiếp →";
    elements.nextButton.disabled = !isItemUnlocked(exerciseIds, state.completed, nextExercise.id);
  } else {
    const nextCourseLesson = courseLessons[state.completedLessons.length];
    elements.nextButton.textContent = nextCourseLesson
      ? `Qua bài ${nextCourseLesson.title} →`
      : "Đã hoàn thành khóa học";
    elements.nextButton.disabled = !isCurrentCompleted || !nextCourseLesson;
  }

  renderNavigation();
  renderExerciseProgress();
  renderCourseProgress();
}

function showFeedback(type, message) {
  elements.feedback.hidden = false;
  elements.feedback.className = `feedback ${type}`;
  elements.feedback.textContent = message;
}

function runInWorker(code, testCode) {
  return new Promise(resolve => {
    const worker = new Worker("./js/runner.js");
    const timeoutId = setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, logs: [], error: "Code chạy quá 2 giây và đã được dừng." });
    }, 2000);

    worker.addEventListener("message", event => {
      clearTimeout(timeoutId);
      worker.terminate();
      resolve(event.data);
    });

    worker.addEventListener("error", event => {
      clearTimeout(timeoutId);
      worker.terminate();
      resolve({ ok: false, logs: [], error: event.message });
    });

    worker.postMessage({ code, testCode });
  });
}

function displayRunResult(result) {
  const output = [...result.logs];
  if (!result.ok) output.push(`\n${result.error}`);
  elements.consoleOutput.textContent = output.length ? output.join("\n") : "Code chạy xong nhưng chưa có output.";
}

async function runCode() {
  elements.runButton.disabled = true;
  elements.consoleOutput.textContent = "Đang chạy...";
  const result = await runInWorker(elements.codeEditor.value, "return null;");
  displayRunResult(result);
  elements.runButton.disabled = false;
}

function checkRequiredPatterns(code, requiredPatterns) {
  for (const requirement of requiredPatterns) {
    if (!new RegExp(requirement.pattern).test(code)) return requirement.message;
  }
  return null;
}

function syncInteractiveLesson() {
  const completedAll = exercises.every(exercise => state.completed.includes(exercise.id));
  if (completedAll) {
    const dataTypesIndex = courseLessonIds.indexOf(DATA_TYPES_LESSON_ID);
    for (const prerequisiteId of courseLessonIds.slice(0, dataTypesIndex + 1)) {
      state.completedLessons = completeItem(courseLessonIds, state.completedLessons, prerequisiteId);
    }
  }
}

async function checkAnswer() {
  const exercise = currentExercise();
  const code = elements.codeEditor.value;
  const patternError = checkRequiredPatterns(code, exercise.requiredPatterns);

  if (patternError) {
    showFeedback("error", patternError);
    return;
  }

  elements.checkButton.disabled = true;
  elements.consoleOutput.textContent = "Đang kiểm tra...";
  const result = await runInWorker(code, exercise.testCode);
  displayRunResult(result);
  elements.checkButton.disabled = false;

  if (!result.ok) {
    showFeedback("error", `Code đang có lỗi: ${result.error}`);
    return;
  }

  if (result.result?.passed) {
    state.completed = completeItem(exerciseIds, state.completed, exercise.id);
    syncInteractiveLesson();
    saveState();
    showFeedback("success", `✓ ${result.result.message}`);
    renderNavigation();
    renderExerciseProgress();
    renderCourseDialog();
    const nextExercise = exercises[state.currentIndex + 1];
    if (nextExercise) {
      elements.nextButton.textContent = "Bài tiếp →";
      elements.nextButton.disabled = !isItemUnlocked(exerciseIds, state.completed, nextExercise.id);
    } else {
      const nextCourseLesson = courseLessons[state.completedLessons.length];
      elements.nextButton.textContent = nextCourseLesson
        ? `Qua bài ${nextCourseLesson.title} →`
        : "Đã hoàn thành khóa học";
      elements.nextButton.disabled = !nextCourseLesson;
    }
    elements.exerciseStatus.textContent = "Đã hoàn thành";
    elements.exerciseStatus.classList.add("completed");
  } else {
    showFeedback("error", result.result?.message ?? "Bài chưa đúng. Hãy kiểm tra lại code.");
  }
}

function selectExercise(index) {
  const selectedExercise = exercises[index];
  if (!selectedExercise || !isItemUnlocked(exerciseIds, state.completed, selectedExercise.id)) {
    showFeedback("error", "Hãy hoàn thành bài hiện tại trước khi mở bài tiếp theo.");
    return;
  }
  state.code[currentExercise().id] = elements.codeEditor.value;
  state.currentIndex = index;
  saveState();
  renderExercise();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openCourseDialog() {
  renderCourseDialog();
  elements.courseDialog.showModal();
}

elements.loginTab.addEventListener("click", () => switchAuthMode("login"));
elements.registerTab.addEventListener("click", () => switchAuthMode("register"));

elements.loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  const submitButton = event.submitter;
  submitButton.disabled = true;
  try {
    const user = await login(formValues(elements.loginForm));
    elements.loginForm.reset();
    window.location.href = "./course.html";
  } catch (error) {
    setAuthMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

elements.registerForm.addEventListener("submit", async event => {
  event.preventDefault();
  const submitButton = event.submitter;
  submitButton.disabled = true;
  try {
    const user = await register(formValues(elements.registerForm));
    elements.registerForm.reset();
    window.location.href = "./course.html";
  } catch (error) {
    setAuthMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

elements.logoutButton.addEventListener("click", () => {
  closeAccountMenu();
  logout();
  currentUser = null;
  state = createEmptyState();
  showAuth("login");
});

function closeAccountMenu() {
  elements.accountDropdownMenu.hidden = true;
  elements.accountMenuButton.setAttribute("aria-expanded", "false");
}

elements.accountMenuButton.addEventListener("click", event => {
  event.stopPropagation();
  const willOpen = elements.accountDropdownMenu.hidden;
  elements.accountDropdownMenu.hidden = !willOpen;
  elements.accountMenuButton.setAttribute("aria-expanded", String(willOpen));
});

elements.accountDropdownMenu.addEventListener("click", event => event.stopPropagation());
document.addEventListener("click", closeAccountMenu);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeAccountMenu();
    elements.accountMenuButton.focus();
  }
});

elements.exerciseList.addEventListener("click", event => {
  const button = event.target.closest("button[data-index]");
  if (button) selectExercise(Number(button.dataset.index));
});

elements.codeEditor.addEventListener("input", () => {
  state.code[currentExercise().id] = elements.codeEditor.value;
  saveState();
});

elements.codeEditor.addEventListener("keydown", event => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = elements.codeEditor.selectionStart;
    const end = elements.codeEditor.selectionEnd;
    elements.codeEditor.setRangeText("  ", start, end, "end");
    elements.codeEditor.dispatchEvent(new Event("input"));
  }
});

elements.runButton.addEventListener("click", runCode);
elements.checkButton.addEventListener("click", checkAnswer);
elements.clearConsoleButton.addEventListener("click", () => {
  elements.consoleOutput.textContent = "Console đã được xóa.";
});
elements.resetCodeButton.addEventListener("click", () => {
  if (!window.confirm("Bạn muốn xóa code hiện tại và làm lại bài này?")) return;
  delete state.code[currentExercise().id];
  saveState();
  renderExercise();
});
elements.resetProgressButton.addEventListener("click", () => {
  if (!window.confirm("Xóa code và tiến độ của 4 bài typeof? Vì khóa học bắt buộc theo thứ tự, các bài phía sau Data Types cũng sẽ bị khóa lại.")) return;
  state.currentIndex = 0;
  state.completed = [];
  state.code = {};
  state.completedLessons = uncompleteItemAndFollowing(
    courseLessonIds,
    state.completedLessons,
    DATA_TYPES_LESSON_ID,
  );
  saveState();
  renderExercise();
  renderCourseDialog();
});
elements.previousButton.addEventListener("click", () => selectExercise(state.currentIndex - 1));
elements.nextButton.addEventListener("click", () => {
  if (state.currentIndex < exercises.length - 1) {
    selectExercise(state.currentIndex + 1);
    return;
  }
  const nextLesson = courseLessons[state.completedLessons.length];
  if (!nextLesson || !isItemUnlocked(courseLessonIds, state.completedLessons, nextLesson.id)) {
    showFeedback("error", "Chưa thể mở bài tiếp theo. Hãy hoàn thành bài hiện tại trước.");
    return;
  }
  saveState();
  window.location.href = `./course.html?lesson=${encodeURIComponent(nextLesson.id)}`;
});
elements.openCourseButton.addEventListener("click", openCourseDialog);
elements.viewCourseButton.addEventListener("click", openCourseDialog);
elements.closeCourseButton.addEventListener("click", () => elements.courseDialog.close());
elements.courseDialog.addEventListener("click", event => {
  if (event.target === elements.courseDialog) elements.courseDialog.close();
});
elements.courseModuleList.addEventListener("click", event => {
  const practiceButton = event.target.closest("[data-open-practice]");
  if (practiceButton) {
    elements.courseDialog.close();
    selectExercise(Math.min(state.completed.length, exercises.length - 1));
    return;
  }
  const summary = event.target.closest("summary");
  if (summary?.closest(".course-module")?.dataset.locked === "true") {
    event.preventDefault();
  }
});
elements.courseModuleList.addEventListener("change", event => {
  const checkbox = event.target.closest("input[data-lesson-id]");
  if (!checkbox) return;
  const lessonId = checkbox.dataset.lessonId;
  if (checkbox.checked) {
    state.completedLessons = completeItem(courseLessonIds, state.completedLessons, lessonId);
    syncInteractiveLesson();
  } else {
    const lessonIndex = courseLessonIds.indexOf(lessonId);
    const hasFollowingProgress = state.completedLessons.length > lessonIndex + 1;
    if (hasFollowingProgress && !window.confirm("Bỏ bài này sẽ khóa lại toàn bộ bài phía sau. Bạn có muốn tiếp tục?")) {
      renderCourseDialog(courseLessons[lessonIndex]?.moduleId);
      return;
    }
    state.completedLessons = uncompleteItemAndFollowing(courseLessonIds, state.completedLessons, lessonId);
  }
  saveState();
  const nextLesson = courseLessons[state.completedLessons.length];
  const currentLesson = courseLessons[courseLessonIds.indexOf(lessonId)];
  renderCourseDialog(nextLesson?.moduleId ?? currentLesson?.moduleId);
});

const existingUser = getCurrentUser();
if (existingUser) {
  showLearningApp(existingUser);
} else {
  showAuth("login");
}
