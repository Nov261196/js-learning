function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

const lessonHighlightTerms = [
  "optional chaining",
  "nullish coalescing",
  "localStorage",
  "console.log",
  "async/await",
  "for/while",
  "JavaScript",
  "Promise",
  "boolean",
  "undefined",
  "function",
  "ternary",
  "typeof",
  "string",
  "number",
  "object",
  "array",
  "return",
  "switch",
  "React",
  "fetch",
  "JSON",
  "DOM",
  "API",
  "const",
  "let",
  "null",
  "async",
  "await",
];

const lessonHighlightPattern = new RegExp(
  `(^|[^A-Za-z0-9_$])(${lessonHighlightTerms
    .sort((first, second) => second.length - first.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})(?![A-Za-z0-9_$])`,
  "gi",
);

function inline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export function section(markdown, title, level = 2) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const marker = new RegExp(`^#{${level}}\\s+${title}\\s*$`, "i");
  const start = lines.findIndex(line => marker.test(line.trim()));
  if (start < 0) return "";
  const next = lines.findIndex((line, index) => index > start && new RegExp(`^#{1,${level}}\\s+`).test(line.trim()));
  return lines.slice(start + 1, next < 0 ? lines.length : next).join("\n").trim();
}

export function subsection(markdown, heading) {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`^###\\s+${escapedHeading}\\s*$`, "im"));
  if (!match) return "";
  const start = match.index + match[0].length;
  const next = markdown.slice(start).search(/^##?\s+/m);
  return markdown.slice(start, next < 0 ? undefined : start + next).trim();
}

export function parseExercises(markdown) {
  const headings = [...markdown.matchAll(/^##\s+(Bài\s+\d+[^\n]*)$/gim)];
  return headings.map((heading, index) => {
    const start = heading.index + heading[0].length;
    const end = headings[index + 1]?.index ?? markdown.length;
    const content = markdown.slice(start, end).trim();
    const purpose = subsection(content, "Bài này để làm gì?");
    const requirements = subsection(content, "Yêu cầu");
    const file = content.match(/(?:Làm bài tại|File thực hành):\s*`?([^`\n.]+(?:\.js)?)/i)?.[1]?.trim() ?? "";
    return {
      title: heading[1].trim(),
      purpose: purpose ? renderMarkdown(purpose) : "",
      requirements: requirements ? renderMarkdown(requirements) : renderMarkdown(content),
      file,
    };
  });
}

export function renderMarkdown(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }

    if (line.startsWith("```")) {
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) code.push(lines[index++]);
      index += 1;
      blocks.push(`<pre class="code-sample"><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = Math.min(heading[1].length, 4);
      blocks.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) quote.push(lines[index++].trim().replace(/^>\s?/, ""));
      blocks.push(`<blockquote>${quote.map(inline).join("<br>")}</blockquote>`);
      continue;
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      const items = [];
      while (index < lines.length) {
        const item = lines[index].trim().match(/^\d+\.\s+(.+)$/);
        if (!item) break;
        items.push(`<li>${inline(item[1])}</li>`);
        index += 1;
      }
      blocks.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    const bullet = line.match(/^[-*]\s+(?:\[[ xX]\]\s*)?(.+)$/);
    if (bullet) {
      const items = [];
      while (index < lines.length) {
        const item = lines[index].trim().match(/^[-*]\s+(?:\[[ xX]\]\s*)?(.+)$/);
        if (!item) break;
        items.push(`<li>${inline(item[1])}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{1,6}\s|```|>|\d+\.\s|[-*]\s)/.test(lines[index].trim())) paragraph.push(lines[index++].trim());
    blocks.push(`<p>${inline(paragraph.join(" "))}</p>`);
  }
  return blocks.join("\n");
}

export function escapeContent(value) {
  return escapeHtml(String(value));
}

export function highlightLessonHtml(html) {
  return String(html)
    .split(/(<[^>]+>)/g)
    .map((part) => part.startsWith("<")
      ? part
      : part.replace(
        lessonHighlightPattern,
        '$1<mark class="lesson-highlight">$2</mark>',
      ))
    .join("");
}

export function highlightLessonText(value) {
  return highlightLessonHtml(escapeHtml(String(value)));
}

export function highlightApplicationText(value) {
  const text = String(value).trim();
  const boundary = text.match(/\s+(như|để|khi|mà|trước khi)\s+/i);
  if (!boundary?.index) return highlightLessonText(text);

  const lead = text.slice(0, boundary.index);
  const detail = text.slice(boundary.index);
  return `<strong class="application-highlight">${highlightLessonText(lead)}</strong>${highlightLessonText(detail)}`;
}
