import { runJavaScript } from "../services/code-runner.service.js";
import { hasTheoryAnswer, isTheoryTask } from "../services/lesson-task.service.js";

export class AppController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.#bindEvents();
  }

  async start() {
    try {
      const user = await this.model.user.restoreSession();
      if (user) {
        await this.model.progress.load(this.model.course);
        this.model.activeLesson = this.#requestedLesson() ?? this.model.course.nextLesson(this.model.progress.state);
        this.#prepareLesson();
      }
    } catch (error) {
      this.model.error = error.message;
    } finally {
      this.model.loading = false;
      this.render();
    }
  }

  render() {
    if (this.model.mode === "course" && this.model.user.user && !this.model.lessonContent) {
      this.#prepareLesson();
    }
    this.view.render(this.model);
  }

  #prepareLesson() {
    if (!this.model.activeLesson) return;
    this.model.lessonContent = this.model.course.lessonContent(
      this.model.activeLesson,
      this.model.progress.state,
    );
    this.model.progress.scheduleSave(Boolean(this.model.user.user));
  }

  #requestedLesson() {
    return this.model.course.findLesson(new URLSearchParams(location.search).get("lesson"));
  }

  #bindEvents() {
    this.view.root.addEventListener("click", (event) => this.#onClick(event));
    this.view.root.addEventListener("submit", (event) => this.#onSubmit(event));
    this.view.root.addEventListener("input", (event) => {
      if (event.target.id === "codeEditor") this.#saveEditor();
    });
    window.addEventListener("popstate", () => {
      const lesson = this.#requestedLesson() ?? this.model.course.nextLesson(this.model.progress.state);
      this.#navigateLesson(lesson.id, false);
    });
  }

  async #onSubmit(event) {
    const form = event.target.closest("[data-auth-form]");
    if (!form) return;
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    try {
      if (form.dataset.authForm === "login") await this.model.user.login(values.email, values.password);
      else await this.model.user.register(values);
      await this.model.progress.load(this.model.course);
      this.model.activeLesson = this.model.course.nextLesson(this.model.progress.state);
      this.model.error = "";
      this.#prepareLesson();
      this.render();
    } catch (error) {
      this.model.error = error.message;
      this.view.showAuthError(error.message);
    }
  }

  async #onClick(event) {
    const target = event.target.closest("button, a");
    if (!target) return;
    if (target.matches("[data-auth-tab]")) return this.#switchAuthTab(target);
    if (target.matches("[data-sign-out]")) return this.#logout();
    if (target.matches("[data-open-catalog]")) return this.#openCatalog();
    if (target.matches("[data-open-practice]")) return this.#navigatePractice(0);
    if (target.matches("[data-select-exercise]")) return this.#navigatePractice(Number(target.dataset.selectExercise));
    if (target.matches("[data-select-lesson], [data-open-lesson]")) {
      event.preventDefault();
      window.bootstrap?.Modal.getInstance(document.querySelector("#courseModal"))?.hide();
      return this.#navigateLesson(target.dataset.selectLesson ?? target.dataset.openLesson);
    }
    if (target.matches("[data-go-current]")) return this.#navigateLesson(this.model.course.nextLesson(this.model.progress.state).id);
    if (target.matches("[data-run-code]")) return this.#runCode(false);
    if (target.matches("[data-check-code]")) return this.#runCode(true);
    if (target.matches("[data-reset-code]")) return this.#resetCode();
    if (target.matches("[data-clear-console]")) {
      this.model.consoleText = "Console đã được xóa.";
      return this.render();
    }
    if (target.matches("[data-previous]")) return this.#previous();
    if (target.matches("[data-next]")) return this.#next();
    if (target.matches("[data-reset-practice-progress]")) return this.#resetPractice();
  }

  #switchAuthTab(target) {
    document.querySelectorAll("[data-auth-tab]").forEach((button) => button.classList.toggle("active", button === target));
    document.querySelectorAll("[data-auth-form]").forEach((form) => {
      form.hidden = form.dataset.authForm !== target.dataset.authTab;
    });
  }

  async #logout() {
    try {
      await this.model.progress.flush(true);
      await this.model.user.logout();
    } catch (error) {
      console.error(error);
    }
    this.model.progress.reset();
    this.model.lessonContent = null;
    this.render();
  }

  #navigatePractice(index) {
    const exercise = this.model.course.exercises[index];
    if (!exercise || !this.model.course.isExerciseUnlocked(exercise.id, this.model.progress.state)) return;
    this.model.mode = "practice";
    this.model.exerciseIndex = index;
    this.model.resetMessages();
    history.pushState({}, "", location.pathname);
    this.render();
  }

  #navigateLesson(id, pushState = true) {
    const lesson = this.model.course.findLesson(id);
    if (!lesson || !this.model.course.isLessonUnlocked(id, this.model.progress.state)) return;
    this.model.mode = "course";
    this.model.activeLesson = lesson;
    this.model.lessonContent = null;
    this.model.resetMessages();
    if (pushState) history.pushState({}, "", `${location.pathname}?lesson=${encodeURIComponent(id)}`);
    this.#prepareLesson();
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  #saveEditor() {
    this.model.progress.saveCode(
      this.model.mode,
      this.model.currentItem(),
      this.view.editorValue(),
      Math.max(0, this.#currentLessonTaskIndex()),
    );
    this.model.progress.scheduleSave(Boolean(this.model.user.user));
  }

  async #runCode(check) {
    const code = this.view.editorValue();
    this.#saveEditor();
    const exercise = this.model.mode === "practice" ? this.model.currentItem() : null;
    const result = await runJavaScript(code, check && exercise ? exercise.testCode : "return null;");
    const lines = [...result.logs];
    this.model.feedback = "";

    if (!result.ok) {
      lines.push(result.error);
      this.#setFeedback("Code gặp lỗi. Hãy xem Console, sửa lỗi rồi thử lại.", "danger");
    } else if (!check) {
      const message = lines.length
        ? "Code đã chạy thành công. Xem kết quả trong Console."
        : "Code đã chạy thành công nhưng chưa tạo output.";
      this.#setFeedback(message, "info");
    } else if (check && exercise) {
      const missing = exercise.requiredPatterns.find((rule) => !new RegExp(rule.pattern, "i").test(code));
      if (missing) {
        this.#setFeedback(missing.message, "danger");
      } else if (result.result?.passed) {
        this.model.progress.completeExercise(exercise.id, this.model.course.exerciseIds);
        this.#setFeedback(result.result.message, "success");
      } else {
        this.#setFeedback(result.result?.message ?? "Code chưa đạt yêu cầu.", "danger");
      }
    } else if (check) {
      const lesson = this.model.activeLesson;
      const taskIndex = this.#currentLessonTaskIndex();
      const task = lesson.exercises[taskIndex];
      const theoryTask = isTheoryTask(task);

      if (!task) {
        this.model.progress.completeLesson(lesson.id, this.model.course.lessonIds);
        this.#setFeedback("Tất cả bài tập trong bài học này đã hoàn thành.", "success");
      } else if (theoryTask && !hasTheoryAnswer(code)) {
        this.#setFeedback(
          `Hãy trả lời ${task.title} bằng một comment, ví dụ: // Câu trả lời của bạn`,
          "danger",
        );
      } else if (!theoryTask && !this.#containsCode(code)) {
        this.#setFeedback(`Hãy viết code cho ${task.title} trước khi kiểm tra.`, "danger");
      } else if (!theoryTask && lines.length === 0) {
        this.#setFeedback(
          `${task.title} chưa có output. Hãy dùng console.log() để in kết quả cần kiểm tra.`,
          "danger",
        );
      } else {
        this.model.progress.setTask(lesson.id, taskIndex, true, this.model.course.lessonIds);
        const lessonComplete = this.model.course.areTasksComplete(lesson.id, this.model.progress.state);

        if (lessonComplete) {
          this.model.progress.completeLesson(lesson.id, this.model.course.lessonIds);
          this.#setFeedback(`Chính xác! ${task.title} đã hoàn thành. Bạn đã hoàn thành bài học.`, "success");
        } else {
          this.#setFeedback(`Chính xác! ${task.title} đã hoàn thành. Chuyển sang bài tiếp theo.`, "success");
        }
        this.#prepareLesson();
      }
    }

    this.model.consoleText = lines.length ? lines.join("\n") : "Code chạy xong nhưng chưa có output.";
    this.model.progress.scheduleSave(Boolean(this.model.user.user));
    this.render();
  }

  #setFeedback(message, type) {
    this.model.feedback = message;
    this.model.feedbackType = type;
  }

  #containsCode(code) {
    return code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "").trim().length > 0;
  }

  #currentLessonTaskIndex() {
    if (this.model.mode !== "course") return 0;
    const lesson = this.model.activeLesson;
    const tasks = this.model.lessonContent?.exercises ?? [];
    const completed = this.model.progress.state.checklists[`${lesson.id}:required-exercises`] ?? {};
    const firstIncomplete = tasks.findIndex((_, index) => completed[index] !== true);
    return firstIncomplete;
  }

  #resetCode() {
    if (!confirm("Xóa code đang viết trong bài này?")) return;
    this.model.progress.resetCode(
      this.model.mode,
      this.model.currentItem(),
      Math.max(0, this.#currentLessonTaskIndex()),
    );
    this.model.progress.scheduleSave(true);
    this.model.resetMessages();
    this.render();
  }

  #resetPractice() {
    if (!confirm("Xóa tiến độ và code của các bài luyện tập?")) return;
    this.model.progress.resetPractice();
    this.model.exerciseIndex = 0;
    this.model.progress.scheduleSave(true);
    this.render();
  }

  #previous() {
    if (this.model.mode === "practice") return this.#navigatePractice(this.model.exerciseIndex - 1);
    const index = this.model.course.lessonIndex(this.model.activeLesson.id);
    const previous = this.model.course.lessons[index - 1];
    if (previous) this.#navigateLesson(previous.id);
  }

  #next() {
    if (this.model.mode === "practice") {
      if (this.model.exerciseIndex < this.model.course.exercises.length - 1) {
        return this.#navigatePractice(this.model.exerciseIndex + 1);
      }
      return this.#navigateLesson(this.model.course.lessons[0].id);
    }
    if (!this.model.course.areTasksComplete(this.model.activeLesson.id, this.model.progress.state)) return;
    const next = this.model.course.lessons[this.model.course.lessonIndex(this.model.activeLesson.id) + 1];
    if (next) this.#navigateLesson(next.id);
  }

  #openCatalog() {
    window.bootstrap?.Modal.getOrCreateInstance(document.querySelector("#courseModal"))?.show();
  }
}
