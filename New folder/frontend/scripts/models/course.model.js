import { courseLessons, courseModules } from "../data/course.data.js";
import { practicalApplications } from "../data/application.data.js";
import { exercises } from "../data/practice.data.js";
import { customSolutions } from "../data/solution.data.js";
import {
  escapeContent,
  highlightLessonHtml,
  highlightLessonText,
  renderMarkdown,
} from "../services/markdown.service.js";
import { isTheoryTask } from "../services/lesson-task.service.js";

export class CourseModel {
  modules = courseModules;
  lessons = courseLessons;
  exercises = exercises;
  lessonIds = courseLessons.map(({ id }) => id);
  exerciseIds = exercises.map(({ id }) => id);

  findLesson(id) {
    return this.lessons.find((lesson) => lesson.id === id) ?? null;
  }

  moduleFor(lesson) {
    return this.modules.find((module) => module.id === lesson?.moduleId) ?? this.modules[0];
  }

  lessonIndex(id) {
    return this.lessonIds.indexOf(id);
  }

  exerciseIndex(id) {
    return this.exerciseIds.indexOf(id);
  }

  isLessonUnlocked(id, progress) {
    const index = this.lessonIndex(id);
    if (index < 0) return false;
    if (index === 0) return true;
    const previousId = this.lessonIds[index - 1];
    return progress.completedLessons.includes(previousId) && this.areTasksComplete(previousId, progress);
  }

  isExerciseUnlocked(id, progress) {
    const index = this.exerciseIndex(id);
    return index === 0 || (index > 0 && progress.completed.includes(this.exerciseIds[index - 1]));
  }

  areTasksComplete(lessonId, progress) {
    const key = `${lessonId}:required-exercises`;
    const count = progress.checklists[`${key}:count`];
    const completed = progress.checklists[key] ?? {};
    return Number.isInteger(count)
      && count > 0
      && Array.from({ length: count }, (_, index) => completed[index] === true).every(Boolean);
  }

  verifiedLessonIds(progress) {
    const result = [];
    for (const lesson of this.lessons) {
      if (!progress.completedLessons.includes(lesson.id) || !this.areTasksComplete(lesson.id, progress)) break;
      result.push(lesson.id);
    }
    return result;
  }

  nextLesson(progress) {
    return this.lessons.find(
      (lesson) => !progress.completedLessons.includes(lesson.id) || !this.areTasksComplete(lesson.id, progress),
    ) ?? this.lessons.at(-1);
  }

  lessonContent(lesson, progress) {
    const module = this.moduleFor(lesson);
    const key = `${lesson.id}:required-exercises`;
    const savedTasks = progress.checklists[key] ?? {};
    const exercises = lesson.exercises.map((task, index) => ({
      title: task.title,
      answerType: isTheoryTask(task) ? "theory" : "code",
      purpose: "",
      requirements: highlightLessonHtml(renderMarkdown(`1. ${task.description}`)),
      file: "",
      completed: savedTasks[index] === true,
    }));
    progress.checklists[`${key}:count`] = exercises.length;
    const fallback = `\`\`\`js\n${lesson.code}\n\`\`\`\n\n${lesson.explanation}`;

    return {
      purpose: highlightLessonHtml(renderMarkdown(lesson.summary)),
      realWorldUse: (practicalApplications[module.id] ?? [])
        .map((application) => `<li>${highlightLessonText(application)}</li>`)
        .join(""),
      moduleGoals: module.goals
        .map((goal) => `<li>${highlightLessonText(goal)}</li>`)
        .join(""),
      requirements: renderMarkdown(
        lesson.exercises.map((task) => `- **${task.title}:** ${task.description}`).join("\n"),
      ),
      exercises,
      concept: renderMarkdown(fallback),
      hint: renderMarkdown(lesson.explanation),
      solution: renderMarkdown(customSolutions[lesson.id] ?? fallback),
    };
  }
}
