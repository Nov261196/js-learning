import { findProgressByUserId, saveProgress } from "../lib/progress.repository.js";
import { toProgressResponse } from "../utils/progress.presenter.js";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isValidProgress(value) {
  if (!isPlainObject(value)) return false;
  if (!Array.isArray(value.completed) || !Array.isArray(value.completedLessons)) return false;
  if (!isPlainObject(value.code) || !isPlainObject(value.lessonCode) || !isPlainObject(value.checklists)) return false;
  return JSON.stringify(value).length <= 450_000;
}

export async function getProgress(request, response, next) {
  try {
    const progress = await findProgressByUserId(request.userId);
    return response.json(toProgressResponse(progress));
  } catch (error) {
    return next(error);
  }
}

export async function updateProgress(request, response, next) {
  if (!isValidProgress(request.body)) {
    return response.status(400).json({ message: "Dữ liệu tiến độ không hợp lệ hoặc quá lớn." });
  }

  try {
    await saveProgress(request.userId, request.body);
    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
}
