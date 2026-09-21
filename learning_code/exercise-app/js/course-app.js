import { getCurrentUser, logout } from "./auth.js";
import { courseLessons, courseModules } from "./course.js";
import { renderMarkdown } from "./markdown.js?v=2";
import {
  completeItem,
  isItemUnlocked,
  normalizeSequentialProgress,
} from "./progress.js";

const USER_STORAGE_PREFIX = "javascript-practice-progress-v2";
const DATA_TYPES_LESSON_ID = "module-01-fundamentals/02-data-types";
const lessonIds = courseLessons.map(lesson => lesson.id);
const user = getCurrentUser();

const elements = {
  userName: document.querySelector("#courseUserName"),
  dropdownName: document.querySelector("#courseDropdownName"),
  dropdownEmail: document.querySelector("#courseDropdownEmail"),
  accountButton: document.querySelector("#courseAccountButton"),
  accountMenu: document.querySelector("#courseAccountMenu"),
  logoutButton: document.querySelector("#courseLogoutButton"),
  percentText: document.querySelector("#coursePercentText"),
  sidebarPercent: document.querySelector("#sidebarPercent"),
  sidebarProgressBar: document.querySelector("#sidebarProgressBar"),
  sidebarProgressText: document.querySelector("#sidebarProgressText"),
  moduleSelector: document.querySelector("#moduleSelector"),
  navigation: document.querySelector("#fullCourseNavigation"),
  sidebar: document.querySelector("#courseSidebar"),
  sidebarButton: document.querySelector("#mobileSidebarButton"),
  sidebarBackdrop: document.querySelector("#sidebarBackdrop"),
  lessonWorkspace: document.querySelector("#lessonWorkspace"),
  lockedLesson: document.querySelector("#lockedLesson"),
  goCurrentLessonButton: document.querySelector("#goCurrentLessonButton"),
  breadcrumbModule: document.querySelector("#breadcrumbModule"),
  breadcrumbLesson: document.querySelector("#breadcrumbLesson"),
  lessonPosition: document.querySelector("#lessonPosition"),
  lessonTitle: document.querySelector("#courseLessonTitle"),
  lessonStatus: document.querySelector("#courseLessonStatus"),
  tabs: [...document.querySelectorAll(".lesson-tab")],
  markdownPanel: document.querySelector("#markdownPanel"),
  markdownContent: document.querySelector("#markdownContent"),
  contentLoading: document.querySelector("#contentLoading"),
  playgroundPanel: document.querySelector("#playgroundPanel"),
  codeHelpTabs: [...document.querySelectorAll(".code-help-tab")],
  codeHelpLoading: document.querySelector("#codeHelpLoading"),
  codeHelpContent: document.querySelector("#codeHelpContent"),
  codeEditor: document.querySelector("#lessonCodeEditor"),
  consoleOutput: document.querySelector("#lessonConsoleOutput"),
  runCodeButton: document.querySelector("#runLessonCodeButton"),
  resetCodeButton: document.querySelector("#resetLessonCodeButton"),
  interactiveNotice: document.querySelector("#interactiveNotice"),
  previousButton: document.querySelector("#previousLessonButton"),
  completeButton: document.querySelector("#completeLessonButton"),
};

let state = createEmptyState();
let activeLesson = null;
let activeTab = "lesson";
let activeHelpTab = "exercises";
let contentRequest = 0;
let helpRequest = 0;

function createEmptyState() {
  return { currentIndex: 0, completed: [], completedLessons: [], code: {}, lessonCode: {}, checklists: {} };
}

function stateKey() {
  return `${USER_STORAGE_PREFIX}:${user.id}`;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(stateKey()) ?? "null");
    return {
      currentIndex: Number.isInteger(saved?.currentIndex) ? saved.currentIndex : 0,
      completed: Array.isArray(saved?.completed) ? saved.completed : [],
      completedLessons: normalizeSequentialProgress(
        lessonIds,
        Array.isArray(saved?.completedLessons) ? saved.completedLessons : [],
      ),
      code: saved?.code && typeof saved.code === "object" ? saved.code : {},
      lessonCode: saved?.lessonCode && typeof saved.lessonCode === "object" ? saved.lessonCode : {},
      checklists: saved?.checklists && typeof saved.checklists === "object" ? saved.checklists : {},
    };
  } catch {
    return createEmptyState();
  }
}

function saveState() {
  localStorage.setItem(stateKey(), JSON.stringify(state));
}

function getLesson(id) {
  return courseLessons.find(lesson => lesson.id === id) ?? null;
}

function getModule(moduleId) {
  return courseModules.find(module => module.id === moduleId);
}

function getRequestedLesson() {
  const requestedId = new URLSearchParams(window.location.search).get("lesson");
  return getLesson(requestedId) ?? courseLessons[state.completedLessons.length] ?? courseLessons.at(-1);
}

function getCurrentLearningLesson() {
  return courseLessons[state.completedLessons.length] ?? courseLessons.at(-1);
}

function progressData() {
  const completed = state.completedLessons.length;
  const total = courseLessons.length;
  return { completed, total, percent: Math.round((completed / total) * 100) };
}

function renderProgress() {
  const { completed, total, percent } = progressData();
  elements.percentText.textContent = `${percent}% hoàn thành`;
  elements.sidebarPercent.textContent = `${percent}%`;
  elements.sidebarProgressBar.style.width = `${percent}%`;
  elements.sidebarProgressText.textContent = `${completed}/${total} bài hoàn thành`;
}

function renderNavigation() {
  elements.moduleSelector.innerHTML = courseModules
    .map((module, moduleIndex) => {
      const moduleLessonIds = module.lessons.map(([lessonId]) => `${module.id}/${lessonId}`);
      const completedCount = moduleLessonIds.filter(id => state.completedLessons.includes(id)).length;
      const moduleUnlocked = isItemUnlocked(lessonIds, state.completedLessons, moduleLessonIds[0]);
      const status = moduleUnlocked ? `${completedCount}/${module.lessons.length}` : "Khóa";
      return `<option value="${module.id}" ${moduleUnlocked ? "" : "disabled"}>${String(moduleIndex + 1).padStart(2, "0")} · ${module.title} · ${status}</option>`;
    })
    .join("");

  const selectedModule = getModule(activeLesson?.moduleId) ?? courseModules[0];
  elements.moduleSelector.value = selectedModule.id;
  const lessons = selectedModule.lessons
    .map(([lessonId, title], lessonIndex) => {
        const id = `${selectedModule.id}/${lessonId}`;
        const completed = state.completedLessons.includes(id);
        const unlocked = isItemUnlocked(lessonIds, state.completedLessons, id);
        const active = activeLesson?.id === id;
        return `
          <li>
            <button
              class="nav-lesson-button ${active ? "active" : ""}"
              type="button"
              data-lesson-id="${id}"
              ${unlocked ? "" : "disabled"}
            >
              <span>${String(lessonIndex + 1).padStart(2, "0")}</span>
              <span>${title}</span>
              <span class="lesson-state-icon">${completed ? "✓" : unlocked ? "" : "🔒"}</span>
            </button>
          </li>`;
      })
    .join("");
  elements.navigation.innerHTML = `<ol class="selected-module-lessons">${lessons}</ol>`;
}

function sourceForTab(tab, lesson) {
  const root = `../${lesson.moduleId}/${lesson.lessonId}`;
  if (tab === "exercises") return `${root}/exercises/README.md`;
  if (tab === "solutions") return `${root}/exercises/SOLUTIONS.md`;
  return `${root}/README.md`;
}

function checklistKey() {
  return `${activeLesson.id}:${activeTab}`;
}

function restoreChecklist(container = elements.markdownContent, key = checklistKey()) {
  const savedChecklist = state.checklists[key] ?? {};
  container.querySelectorAll("input[data-task-index]").forEach(input => {
    const taskIndex = input.dataset.taskIndex;
    if (Object.hasOwn(savedChecklist, taskIndex)) input.checked = savedChecklist[taskIndex];
  });
}

async function loadCodeHelp(tab = activeHelpTab) {
  const requestId = ++helpRequest;
  activeHelpTab = tab;
  elements.codeHelpTabs.forEach(button => button.classList.toggle("active", button.dataset.helpTab === tab));
  elements.codeHelpLoading.hidden = false;
  elements.codeHelpLoading.textContent = tab === "solutions" ? "Đang tải lời giải..." : "Đang tải gợi ý...";
  elements.codeHelpContent.innerHTML = "";
  try {
    const source = sourceForTab(tab, activeLesson);
    const response = await fetch(source, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    if (requestId !== helpRequest) return;
    elements.codeHelpContent.innerHTML = renderMarkdown(markdown, source);
    restoreChecklist(elements.codeHelpContent, `${activeLesson.id}:code-help-${tab}`);
  } catch (error) {
    if (requestId !== helpRequest) return;
    elements.codeHelpContent.innerHTML = `<div class="feedback error">Không tải được nội dung hỗ trợ: ${error.message}.</div>`;
  } finally {
    if (requestId === helpRequest) elements.codeHelpLoading.hidden = true;
  }
}

async function loadMarkdown(tab) {
  const requestId = ++contentRequest;
  activeTab = tab;
  elements.tabs.forEach(button => button.classList.toggle("active", button.dataset.tab === tab));
  const isPlayground = tab === "playground";
  elements.markdownPanel.hidden = isPlayground;
  elements.playgroundPanel.hidden = !isPlayground;

  if (isPlayground) {
    elements.codeEditor.value = state.lessonCode[activeLesson.id] ?? "// Viết code của bạn ở đây";
    loadCodeHelp();
    return;
  }

  elements.contentLoading.hidden = false;
  elements.markdownContent.innerHTML = "";
  try {
    const source = sourceForTab(tab, activeLesson);
    const response = await fetch(source, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    if (requestId !== contentRequest) return;
    elements.markdownContent.innerHTML = renderMarkdown(markdown, source);
    restoreChecklist();
  } catch (error) {
    if (requestId !== contentRequest) return;
    elements.markdownContent.innerHTML = `<div class="feedback error">Không tải được nội dung: ${error.message}. Hãy chắc chắn app đang chạy bằng Live Server.</div>`;
  } finally {
    if (requestId === contentRequest) elements.contentLoading.hidden = true;
  }
}

function renderLesson(lesson) {
  activeLesson = lesson;
  const module = getModule(lesson.moduleId);
  const globalIndex = lessonIds.indexOf(lesson.id);
  const completed = state.completedLessons.includes(lesson.id);
  const unlocked = isItemUnlocked(lessonIds, state.completedLessons, lesson.id);

  if (!unlocked) {
    elements.lessonWorkspace.hidden = true;
    elements.lockedLesson.hidden = false;
    renderNavigation();
    return;
  }

  elements.lessonWorkspace.hidden = false;
  elements.lockedLesson.hidden = true;
  elements.breadcrumbModule.textContent = module.title;
  elements.breadcrumbLesson.textContent = lesson.title;
  elements.lessonPosition.textContent = `Bài ${globalIndex + 1} / ${courseLessons.length}`;
  elements.lessonTitle.textContent = lesson.title;
  elements.lessonStatus.textContent = completed ? "Đã hoàn thành" : "Đang học";
  elements.lessonStatus.classList.toggle("completed", completed);
  elements.previousButton.disabled = globalIndex === 0;
  elements.interactiveNotice.hidden = lesson.id !== DATA_TYPES_LESSON_ID || completed;

  if (lesson.id === DATA_TYPES_LESSON_ID && !completed) {
    elements.completeButton.textContent = "Mở 4 bài thực hành →";
  } else if (completed) {
    const nextLesson = courseLessons[globalIndex + 1];
    elements.completeButton.textContent = nextLesson ? "Tiếp tục →" : "Đã hoàn thành khóa học";
    elements.completeButton.disabled = !nextLesson;
  } else {
    const nextLesson = courseLessons[globalIndex + 1];
    elements.completeButton.textContent = nextLesson ? "Hoàn thành & tiếp tục →" : "Hoàn thành khóa học";
    elements.completeButton.disabled = false;
  }

  renderNavigation();
  renderProgress();
  loadMarkdown(activeTab);
}

function navigateToLesson(lessonId, replace = false) {
  const lesson = getLesson(lessonId);
  if (!lesson) return;
  const url = `./course.html?lesson=${encodeURIComponent(lesson.id)}`;
  window.history[replace ? "replaceState" : "pushState"]({}, "", url);
  renderLesson(lesson);
  closeMobileSidebar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function completeAndContinue() {
  const index = lessonIds.indexOf(activeLesson.id);
  const completed = state.completedLessons.includes(activeLesson.id);

  if (activeLesson.id === DATA_TYPES_LESSON_ID && !completed) {
    window.location.href = "./index.html";
    return;
  }

  if (!completed) {
    state.completedLessons = completeItem(lessonIds, state.completedLessons, activeLesson.id);
    saveState();
  }

  const nextLesson = courseLessons[index + 1];
  if (nextLesson && isItemUnlocked(lessonIds, state.completedLessons, nextLesson.id)) {
    navigateToLesson(nextLesson.id);
  } else {
    renderLesson(activeLesson);
  }
}

function runCode(code) {
  return new Promise(resolve => {
    const worker = new Worker("./js/runner.js");
    const timeout = setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, logs: [], error: "Code chạy quá 2 giây và đã được dừng." });
    }, 2000);
    worker.addEventListener("message", event => {
      clearTimeout(timeout);
      worker.terminate();
      resolve(event.data);
    });
    worker.addEventListener("error", event => {
      clearTimeout(timeout);
      worker.terminate();
      resolve({ ok: false, logs: [], error: event.message });
    });
    worker.postMessage({ code, testCode: "return null;" });
  });
}

function closeAccountMenu() {
  elements.accountMenu.hidden = true;
  elements.accountButton.setAttribute("aria-expanded", "false");
}

function openMobileSidebar() {
  elements.sidebar.classList.add("open");
  elements.sidebarBackdrop.hidden = false;
}

function closeMobileSidebar() {
  elements.sidebar.classList.remove("open");
  elements.sidebarBackdrop.hidden = true;
}

function initialize() {
  if (!user) {
    window.location.replace("./index.html");
    return;
  }

  state = loadState();
  elements.userName.textContent = user.name;
  elements.dropdownName.textContent = user.name;
  elements.dropdownEmail.textContent = user.email;
  renderProgress();
  const lesson = getRequestedLesson();
  navigateToLesson(lesson.id, true);

  elements.navigation.addEventListener("click", event => {
    const lessonButton = event.target.closest("button[data-lesson-id]");
    if (lessonButton) navigateToLesson(lessonButton.dataset.lessonId);
  });
  elements.moduleSelector.addEventListener("change", () => {
    const moduleLessons = courseLessons.filter(lesson => lesson.moduleId === elements.moduleSelector.value);
    const targetLesson = moduleLessons.find(lesson =>
      isItemUnlocked(lessonIds, state.completedLessons, lesson.id)
      && !state.completedLessons.includes(lesson.id),
    ) ?? moduleLessons.find(lesson => isItemUnlocked(lessonIds, state.completedLessons, lesson.id));
    if (targetLesson) navigateToLesson(targetLesson.id);
  });
  elements.tabs.forEach(button => button.addEventListener("click", () => loadMarkdown(button.dataset.tab)));
  elements.codeHelpTabs.forEach(button => button.addEventListener("click", () => loadCodeHelp(button.dataset.helpTab)));
  elements.markdownContent.addEventListener("change", event => {
    const checkbox = event.target.closest("input[data-task-index]");
    if (!checkbox) return;
    const key = checklistKey();
    state.checklists[key] ??= {};
    state.checklists[key][checkbox.dataset.taskIndex] = checkbox.checked;
    saveState();
  });
  elements.codeHelpContent.addEventListener("change", event => {
    const checkbox = event.target.closest("input[data-task-index]");
    if (!checkbox) return;
    const key = `${activeLesson.id}:code-help-${activeHelpTab}`;
    state.checklists[key] ??= {};
    state.checklists[key][checkbox.dataset.taskIndex] = checkbox.checked;
    saveState();
  });
  elements.previousButton.addEventListener("click", () => {
    const previous = courseLessons[lessonIds.indexOf(activeLesson.id) - 1];
    if (previous) navigateToLesson(previous.id);
  });
  elements.completeButton.addEventListener("click", completeAndContinue);
  elements.goCurrentLessonButton.addEventListener("click", () => navigateToLesson(getCurrentLearningLesson().id));
  elements.codeEditor.addEventListener("input", () => {
    state.lessonCode[activeLesson.id] = elements.codeEditor.value;
    saveState();
  });
  elements.codeEditor.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      event.preventDefault();
      elements.codeEditor.setRangeText("  ", elements.codeEditor.selectionStart, elements.codeEditor.selectionEnd, "end");
      elements.codeEditor.dispatchEvent(new Event("input"));
    }
  });
  elements.runCodeButton.addEventListener("click", async () => {
    elements.runCodeButton.disabled = true;
    elements.consoleOutput.textContent = "Đang chạy...";
    const result = await runCode(elements.codeEditor.value);
    const output = [...result.logs];
    if (!result.ok) output.push(result.error);
    elements.consoleOutput.textContent = output.length ? output.join("\n") : "Code chạy xong nhưng chưa có output.";
    elements.runCodeButton.disabled = false;
  });
  elements.resetCodeButton.addEventListener("click", () => {
    if (!window.confirm("Xóa code đang viết trong bài này?")) return;
    delete state.lessonCode[activeLesson.id];
    elements.codeEditor.value = "// Viết code của bạn ở đây";
    saveState();
  });
  elements.accountButton.addEventListener("click", event => {
    event.stopPropagation();
    const open = elements.accountMenu.hidden;
    elements.accountMenu.hidden = !open;
    elements.accountButton.setAttribute("aria-expanded", String(open));
  });
  elements.accountMenu.addEventListener("click", event => event.stopPropagation());
  document.addEventListener("click", closeAccountMenu);
  elements.logoutButton.addEventListener("click", () => {
    logout();
    window.location.replace("./index.html");
  });
  elements.sidebarButton.addEventListener("click", openMobileSidebar);
  elements.sidebarBackdrop.addEventListener("click", closeMobileSidebar);
  window.addEventListener("popstate", () => renderLesson(getRequestedLesson()));
}

initialize();
