export function courseCatalog(modules, lessons, completedIds) {
  const content = modules.map((module, index) => {
    const moduleLessons = lessons.filter(lesson => lesson.moduleId === module.id);
    const completedCount = moduleLessons.filter(lesson => completedIds.includes(lesson.id)).length;
    const unlocked = moduleLessons.length === 0 || isUnlocked(lessons, completedIds, moduleLessons[0].id);
    const rows = moduleLessons.map(lesson => {
      const lessonIndex = lessons.findIndex(item => item.id === lesson.id);
      const available = isUnlocked(lessons, completedIds, lesson.id);
      const completed = completedIds.includes(lesson.id);
      return `<li class="list-group-item d-flex justify-content-between align-items-center gap-3"><span>${String(lessonIndex + 1).padStart(2, "0")} · ${escape(lesson.title)}</span>${available ? `<a class="btn btn-sm btn-outline-light" href="?lesson=${encodeURIComponent(lesson.id)}" data-open-lesson="${escape(lesson.id)}">${completed ? "Học lại" : "Học bài"}</a>` : `<span class="text-secondary" title="Hoàn thành bài trước để mở khóa">🔒</span>`}</li>`;
    }).join("");
    return `<details class="module-accordion" ${index === 0 && unlocked ? "open" : ""}><summary><span>Module ${String(index + 1).padStart(2, "0")} · ${escape(module.title)}</span><span class="badge text-bg-secondary">${completedCount}/${moduleLessons.length}</span></summary><ul class="list-group list-group-flush">${rows}</ul></details>`;
  }).join("");
  return `<div class="modal fade" id="courseModal" tabindex="-1" aria-labelledby="courseModalTitle" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-scrollable"><div class="modal-content"><div class="modal-header"><div><p class="eyebrow mb-1">LỘ TRÌNH</p><h2 class="modal-title fs-5" id="courseModalTitle">16 module JavaScript</h2></div><button class="btn-close btn-close-white" type="button" data-bs-dismiss="modal" aria-label="Đóng"></button></div><div class="modal-body">${content}</div></div></div></div>`;
}

function isUnlocked(lessons, completedIds, id) {
  const index = lessons.findIndex(lesson => lesson.id === id);
  return index <= 0 || completedIds.includes(lessons[index - 1]?.id);
}

function escape(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
