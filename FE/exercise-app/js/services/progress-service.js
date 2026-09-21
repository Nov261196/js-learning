import { apiRequest } from "./api-client.js";
import { courseLessons } from "../data/course-data.js";
import { exercises } from "../data/practice-data.js";

export const courseLessonIds = courseLessons.map(lesson => lesson.id);
export const exerciseIds = exercises.map(exercise => exercise.id);

export function createProgress() {
  return { completed: [], completedLessons: [], code: {}, lessonCode: {}, checklists: {} };
}

export function normalizeProgress(ids, completed) {
  const completeSet = new Set(completed);
  const result = [];
  for (const id of ids) {
    if (!completeSet.has(id)) break;
    result.push(id);
  }
  return result;
}

export function isUnlocked(ids, completed, id) {
  const index = ids.indexOf(id);
  if (index < 0) return false;
  return index === 0 || normalizeProgress(ids, completed).includes(ids[index - 1]);
}

function normalizeSavedProgress(saved = {}) {
  return {
    completed: normalizeProgress(exerciseIds, Array.isArray(saved.completed) ? saved.completed : []),
    completedLessons: normalizeProgress(courseLessonIds, Array.isArray(saved.completedLessons) ? saved.completedLessons : []),
    code: saved.code && typeof saved.code === "object" && !Array.isArray(saved.code) ? saved.code : {},
    lessonCode: saved.lessonCode && typeof saved.lessonCode === "object" && !Array.isArray(saved.lessonCode) ? saved.lessonCode : {},
    checklists: saved.checklists && typeof saved.checklists === "object" && !Array.isArray(saved.checklists) ? saved.checklists : {},
  };
}

export async function loadProgress() {
  return normalizeSavedProgress(await apiRequest("/api/progress"));
}

let pendingSave = Promise.resolve();

export function saveProgress(_userId, state) {
  const snapshot = JSON.stringify(state);
  pendingSave = pendingSave
    .catch(() => {})
    .then(() => apiRequest("/api/progress", { method: "PUT", body: snapshot }));
  return pendingSave;
}
