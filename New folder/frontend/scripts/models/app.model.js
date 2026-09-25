import { CourseModel } from "./course.model.js";
import { ProgressModel } from "./progress.model.js";
import { UserModel } from "./user.model.js";

export class AppModel {
  user = new UserModel();
  course = new CourseModel();
  progress = new ProgressModel();
  mode = "course";
  exerciseIndex = 0;
  activeLesson = null;
  lessonContent = null;
  consoleText = "Nhấn “Chạy code” để xem kết quả.";
  feedback = "";
  feedbackType = "info";
  loading = true;
  error = "";

  constructor() {
    const requestedId = new URLSearchParams(location.search).get("lesson");
    this.activeLesson = this.course.findLesson(requestedId) ?? this.course.lessons[0];
  }

  resetMessages() {
    this.feedback = "";
    this.consoleText = "Nhấn “Chạy code” để xem kết quả.";
  }

  currentItem() {
    return this.mode === "practice" ? this.course.exercises[this.exerciseIndex] : this.activeLesson;
  }
}
