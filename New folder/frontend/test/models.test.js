import assert from "node:assert/strict";
import { test } from "node:test";
import { CourseModel } from "../scripts/models/course.model.js";
import { ProgressModel } from "../scripts/models/progress.model.js";
import { hasTheoryAnswer, isTheoryTask } from "../scripts/services/lesson-task.service.js";

const course = new CourseModel();

test("contains the complete 16-module curriculum", () => {
  assert.equal(course.modules.length, 16);
  assert.ok(course.lessons.length > 60);
  assert.ok(course.exercises.length > 0);
});

test("only the first lesson is initially unlocked", () => {
  const progress = new ProgressModel().state;

  assert.equal(course.isLessonUnlocked(course.lessonIds[0], progress), true);
  assert.equal(course.isLessonUnlocked(course.lessonIds[1], progress), false);
});

test("lesson content creates required tasks and a solution", () => {
  const progress = new ProgressModel().state;
  const lesson = course.lessons[0];
  const content = course.lessonContent(lesson, progress);

  assert.equal(content.exercises.length, lesson.exercises.length);
  assert.match(content.solution, /<pre|<p/);
  assert.match(content.realWorldUse, /<li(?:\s[^>]*)?>/);
  assert.match(content.moduleGoals, /<li(?:\s[^>]*)?>/);
  assert.match(content.purpose, /lesson-highlight/);
  assert.match(content.realWorldUse, /application-highlight/);
  assert.doesNotMatch(content.realWorldUse, /text-danger/);
  assert.equal(progress.checklists[`${lesson.id}:required-exercises:count`], lesson.exercises.length);
});

test("completing every task unlocks the next lesson", () => {
  const progressModel = new ProgressModel();
  const first = course.lessons[0];
  course.lessonContent(first, progressModel.state);

  first.exercises.forEach((_, index) => {
    progressModel.setTask(first.id, index, true, course.lessonIds);
  });
  progressModel.completeLesson(first.id, course.lessonIds);

  assert.equal(course.areTasksComplete(first.id, progressModel.state), true);
  assert.equal(course.isLessonUnlocked(course.lessonIds[1], progressModel.state), true);
});

test("stores code separately for every lesson exercise", () => {
  const progress = new ProgressModel();
  const lesson = course.lessons[0];

  progress.saveCode("course", lesson, "// Bài 1", 0);
  progress.saveCode("course", lesson, "// Bài 2", 1);

  assert.equal(progress.codeFor("course", lesson, 0), "// Bài 1");
  assert.equal(progress.codeFor("course", lesson, 1), "// Bài 2");
});

test("recognizes and validates a written answer for theory tasks", () => {
  assert.equal(isTheoryTask({ description: "Giải thích vì sao nên dùng const." }), true);
  assert.equal(isTheoryTask({ description: "Mô tả cách event loop hoạt động." }), true);
  assert.equal(isTheoryTask({ description: "Tạo const name và in kết quả." }), false);
  assert.equal(hasTheoryAnswer("// Viết câu trả lời của bạn tại đây"), false);
  assert.equal(hasTheoryAnswer("// const phù hợp vì biến button không được gán lại."), true);
});
