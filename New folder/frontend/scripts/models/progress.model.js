import { fetchProgress, persistProgress } from "../services/progress.service.js";

const emptyProgress = () => ({
  completed: [],
  completedLessons: [],
  code: {},
  lessonCode: {},
  checklists: {},
});

const plainObject = (value) => value && typeof value === "object" && !Array.isArray(value);

export class ProgressModel {
  #saveTimer = null;
  state = emptyProgress();

  async load(course) {
    const saved = await fetchProgress();
    this.state = {
      completed: this.#normalizeSequence(course.exerciseIds, saved.completed),
      completedLessons: this.#normalizeSequence(course.lessonIds, saved.completedLessons),
      code: plainObject(saved.code) ? saved.code : {},
      lessonCode: plainObject(saved.lessonCode) ? saved.lessonCode : {},
      checklists: plainObject(saved.checklists) ? saved.checklists : {},
    };
    return this.state;
  }

  reset() {
    clearTimeout(this.#saveTimer);
    this.state = emptyProgress();
  }

  scheduleSave(enabled = true) {
    if (!enabled) return;
    clearTimeout(this.#saveTimer);
    const snapshot = structuredClone(this.state);
    this.#saveTimer = setTimeout(() => persistProgress(snapshot), 350);
  }

  async flush(enabled = true) {
    clearTimeout(this.#saveTimer);
    if (enabled) await persistProgress(structuredClone(this.state));
  }

  codeFor(mode, item, taskIndex = 0) {
    return mode === "practice"
      ? this.state.code[item.id] ?? item.starterCode
      : this.state.lessonCode[this.#lessonTaskKey(item.id, taskIndex)]
        ?? (taskIndex === 0 ? this.state.lessonCode[item.id] : undefined)
        ?? "// Viết code của bạn ở đây\n";
  }

  saveCode(mode, item, code, taskIndex = 0) {
    if (mode === "practice") this.state.code[item.id] = code;
    else this.state.lessonCode[this.#lessonTaskKey(item.id, taskIndex)] = code;
  }

  resetCode(mode, item, taskIndex = 0) {
    if (mode === "practice") delete this.state.code[item.id];
    else delete this.state.lessonCode[this.#lessonTaskKey(item.id, taskIndex)];
  }

  setTask(lessonId, index, completed, lessonIds) {
    const key = `${lessonId}:required-exercises`;
    this.state.checklists[key] ??= {};
    this.state.checklists[key][index] = completed;
    const lessonIndex = lessonIds.indexOf(lessonId);
    this.state.completedLessons = lessonIds
      .slice(0, lessonIndex)
      .filter((id) => this.state.completedLessons.includes(id));
  }

  completeExercise(id, orderedIds) {
    this.state.completed = this.#normalizeSequence(orderedIds, [...this.state.completed, id]);
  }

  completeLesson(id, orderedIds) {
    const index = orderedIds.indexOf(id);
    this.state.completedLessons = orderedIds
      .slice(0, index + 1)
      .filter((lessonId) => [...this.state.completedLessons, id].includes(lessonId));
  }

  resetPractice() {
    this.state.completed = [];
    this.state.code = {};
  }

  #lessonTaskKey(lessonId, taskIndex) {
    return `${lessonId}:exercise:${Math.max(0, taskIndex)}`;
  }

  #normalizeSequence(ids, completed = []) {
    const completedSet = new Set(Array.isArray(completed) ? completed : []);
    const result = [];
    for (const id of ids) {
      if (!completedSet.has(id)) break;
      result.push(id);
    }
    return result;
  }
}
