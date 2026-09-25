export function toProgressResponse(progress) {
  if (!progress) {
    return {
      completed: [],
      completedLessons: [],
      code: {},
      lessonCode: {},
      checklists: {},
    };
  }

  return {
    completed: progress.completed,
    completedLessons: progress.completedLessons,
    code: progress.code,
    lessonCode: progress.lessonCode,
    checklists: progress.checklists,
  };
}
