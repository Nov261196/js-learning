import assert from "node:assert/strict";
import { test } from "node:test";
import { codeLab } from "../scripts/views/code-lab.view.js";
import { lessonContent } from "../scripts/views/lesson.view.js";
import { sidebar } from "../scripts/views/sidebar.view.js";

function renderCodeLab(overrides = {}) {
  return codeLab({
    value: "console.log('Minh');",
    output: "Minh",
    solution: "",
    previousDisabled: true,
    nextLabel: "Bài tiếp",
    ...overrides,
  });
}

test("Code Lab renders feedback as a visible alert below the action buttons", () => {
  const html = renderCodeLab({
    feedback: "Thành công! Bài học đã hoàn thành.",
    feedbackType: "success",
  });

  assert.match(html, /class="alert alert-success code-feedback"/);
  assert.match(html, /role="alert" aria-live="assertive"/);
  assert.ok(html.indexOf("code-feedback") < html.indexOf("io-requirements"));
});

test("Code Lab omits the alert when there is no feedback", () => {
  const html = renderCodeLab();

  assert.doesNotMatch(html, /code-feedback/);
});

test("Code Lab gives comment instructions for a theory task", () => {
  const html = renderCodeLab({
    value: "// Viết code của bạn ở đây\n",
    taskBrief: {
      title: "Bài 3",
      description: "Giải thích vì sao const phù hợp để lưu DOM element.",
    },
  });

  assert.match(html, /CÂU TRẢ LỜI MONG ĐỢI/);
  assert.match(html, /Viết câu trả lời của bạn tại đây/);
  assert.match(html, /không bắt buộc có output/);
});

test("lesson overview sections are collapsible", () => {
  const html = lessonContent({
    mode: "lesson",
    lesson: { title: "let & const" },
    position: "1 / 78",
    completed: false,
    content: {
      purpose: "<p>Lưu và thay đổi dữ liệu.</p>",
      realWorldUse: "<li>Quản lý số lượng giỏ hàng.</li>",
      moduleGoals: "<li>Biết chọn let hoặc const.</li>",
      exercises: [],
      concept: "<p>Kiến thức.</p>",
      hint: "<p>Gợi ý.</p>",
    },
  });

  assert.match(
    html,
    /<details class="concept-card lesson-purpose-details[\s\S]*?<summary>Bài này để làm gì\?<\/summary>/,
  );
  assert.match(
    html,
    /<details class="concept-card lesson-application-details[\s\S]*?<summary>Áp dụng vào thực tế để làm gì\?<\/summary>/,
  );
  assert.match(
    html,
    /<details class="concept-card module-goals-details[\s\S]*?<summary>Mục tiêu module<\/summary>/,
  );
});

test("lesson omits module goals when the list is empty", () => {
  const html = lessonContent({
    mode: "lesson",
    lesson: { title: "let & const" },
    position: "1 / 78",
    completed: false,
    content: { exercises: [] },
  });

  assert.doesNotMatch(html, /module-goals-details/);
});

test("required exercises are checked by Code Lab instead of manual checkboxes", () => {
  const html = lessonContent({
    mode: "lesson",
    lesson: { title: "let & const" },
    position: "1 / 78",
    completed: false,
    content: {
      exercises: [
        { title: "Bài 1", requirements: "<p>Yêu cầu 1</p>", completed: false },
        { title: "Bài 2", requirements: "<p>Yêu cầu 2</p>", completed: false },
      ],
    },
  });

  assert.doesNotMatch(html, /data-lesson-exercise/);
  assert.match(html, /Đang làm/);
  assert.match(html, /Chưa mở/);
  assert.match(html, /nhấn “Kiểm tra bài”/);
  assert.doesNotMatch(html, /Đã hoàn thành bài này/);
});

test("sidebar separates its intro, scrollable lessons and progress card", () => {
  const html = sidebar({
    mode: "course",
    module: {
      id: "module-01",
      title: "Fundamentals",
      description: "Kiến thức nền tảng.",
      lessons: [{ id: "lesson-01", title: "let & const" }],
    },
    moduleIndex: 0,
    lessons: [],
    activeId: "module-01/lesson-01",
    state: { completed: [] },
    totalLessons: [{ id: "module-01/lesson-01" }],
    completedCourseIds: [],
    isCourseLessonUnlocked: () => true,
  });

  assert.match(html, /class="sidebar-intro"/);
  assert.ok(html.indexOf("sidebar-intro") < html.indexOf("lesson-navigation"));
  assert.ok(html.indexOf("lesson-navigation") < html.indexOf("progress-card"));
});
