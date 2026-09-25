import { prisma } from "./prisma.js";

const progressFields = {
  completed: true,
  completedLessons: true,
  code: true,
  lessonCode: true,
  checklists: true,
};

export function findProgressByUserId(userId) {
  return prisma.userProgress.findUnique({ where: { userId }, select: progressFields });
}

export function saveProgress(userId, progress) {
  const data = {
    completed: progress.completed,
    completedLessons: progress.completedLessons,
    code: progress.code,
    lessonCode: progress.lessonCode,
    checklists: progress.checklists,
  };

  return prisma.userProgress.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });
}
