const THEORY_TASK_PATTERN = /^(giải thích|mô tả|nêu|cho biết)(?:\s|$)/i;
const PLACEHOLDER_PATTERN = /viết (?:code|câu trả lời) của bạn (?:ở|tại) đây/i;

export function isTheoryTask(task) {
  return THEORY_TASK_PATTERN.test(String(task?.description ?? "").trim());
}

export function hasTheoryAnswer(code) {
  const source = String(code ?? "");
  const answers = [
    ...[...source.matchAll(/\/\/\s*(.+)$/gm)].map((match) => match[1]),
    ...[...source.matchAll(/\/\*([\s\S]*?)\*\//g)].map((match) => match[1]),
    ...[...source.matchAll(/(["'`])([\s\S]*?)\1/g)].map((match) => match[2]),
  ]
    .map((answer) => answer.replace(/\s+/g, " ").trim())
    .filter((answer) => answer && !PLACEHOLDER_PATTERN.test(answer));

  return answers.some((answer) => answer.length >= 12);
}
