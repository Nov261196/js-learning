import { authView } from "./auth.view.js";
import { codeLab } from "./code-lab.view.js";
import { courseCatalog } from "./course-catalog.view.js";
import { lessonContent, lessonLoading } from "./lesson.view.js";
import { sidebar } from "./sidebar.view.js";
import { topbar } from "./topbar.view.js";
import { escapeContent } from "../services/markdown.service.js";

export class AppView {
  constructor(root) {
    this.root = root;
  }

  render(model) {
    if (model.loading) {
      this.root.innerHTML = `<main class="auth-screen container-fluid d-grid min-vh-100 place-items-center"><div class="text-center"><span class="spinner-border text-warning" role="status"></span><p class="text-secondary mt-3">Đang kết nối VUDN…</p></div></main>`;
      return;
    }
    if (!model.user.user) {
      this.root.innerHTML = authView();
      this.showAuthError(model.error);
      return;
    }

    const course = model.course;
    const progress = model.progress.state;
    const item = model.currentItem();
    const module = course.moduleFor(model.activeLesson);
    const completedIds = course.verifiedLessonIds(progress);
    const isPractice = model.mode === "practice";
    const currentIndex = isPractice ? model.exerciseIndex : course.lessonIndex(item.id);
    const total = isPractice ? course.exercises.length : course.lessons.length;
    const completed = isPractice
      ? progress.completed.includes(item.id)
      : progress.completedLessons.includes(item.id) && course.areTasksComplete(item.id, progress);
    const unlocked = isPractice
      ? course.isExerciseUnlocked(item.id, progress)
      : course.isLessonUnlocked(item.id, progress);
    const tasks = model.lessonContent?.exercises ?? [];
    const taskIndex = tasks.findIndex((_, index) => progress.checklists[`${item.id}:required-exercises`]?.[index] !== true);
    const task = taskIndex >= 0 ? item.exercises[taskIndex] : null;
    const editorTaskIndex = taskIndex >= 0 ? taskIndex : Math.max(0, tasks.length - 1);
    const solution = isPractice
      ? `<pre class="code-sample"><code>${escapeContent(item.solution)}</code></pre><ul>${item.explanation.map((line) => `<li>${escapeContent(line)}</li>`).join("")}</ul>`
      : model.lessonContent?.solution ?? "<p>Chưa có lời giải tham khảo.</p>";
    const nextLabel = isPractice
      ? currentIndex === total - 1 ? "Vào bài học" : "Bài tiếp"
      : completed ? currentIndex === total - 1 ? "Đã xong" : "Bài tiếp" : "Tiếp tục";

    this.root.innerHTML = `
      ${topbar(model.user.user, course.lessons.length, completedIds)}
      <div class="app-layout">
        <div id="sidebarRoot">${sidebar({ mode: model.mode, module, moduleIndex: course.modules.indexOf(module), lessons: course.exercises, activeId: item.id, state: progress, totalLessons: course.lessons, completedCourseIds: completedIds, isCourseLessonUnlocked: (id) => course.isLessonUnlocked(id, progress) })}</div>
        <main id="lessonRoot" class="lesson-column" aria-live="polite">
          ${!unlocked
            ? `<article class="lesson-card card h-100 text-center justify-content-center p-5"><p class="display-5">🔒</p><h2>Bài học chưa được mở khóa</h2><button class="btn btn-warning align-self-center" type="button" data-go-current>Đến bài đang học</button></article>`
            : isPractice
              ? lessonContent({ mode: model.mode, exercise: item, position: `${currentIndex + 1} / ${total}`, completed })
              : model.lessonContent
                ? lessonContent({ mode: model.mode, lesson: item, position: `${currentIndex + 1} / ${total}`, completed, content: model.lessonContent })
                : lessonLoading()}
        </main>
        <div id="codeRoot">${unlocked ? codeLab({ value: model.progress.codeFor(model.mode, item, editorTaskIndex), output: model.consoleText, solution, taskBrief: task, previousDisabled: currentIndex === 0, nextLabel, nextDisabled: !isPractice && (!completed || currentIndex === total - 1), feedback: model.feedback, feedbackType: model.feedbackType }) : ""}</div>
      </div>
      ${courseCatalog(course.modules, course.lessons, completedIds)}`;
  }

  showAuthError(message) {
    if (!message) return;
    const target = this.root.querySelector("[data-auth-message]");
    if (target) {
      target.textContent = message;
      target.classList.add("text-danger");
    }
  }

  editorValue() {
    return this.root.querySelector("#codeEditor")?.value ?? "";
  }
}
