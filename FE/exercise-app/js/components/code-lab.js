export function codeLab({ value, output, solution, taskBrief = null, previousDisabled, nextDisabled = false, nextLabel, feedback = "", feedbackType = "info" }) {
  return `
    <section class="code-lab card h-100" aria-label="Code Lab">
      <header class="editor-toolbar d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-2"><span class="traffic-dot red"></span><span class="traffic-dot yellow"></span><span class="traffic-dot green"></span><code>exercise.js</code></div>
        <button class="btn btn-sm btn-link" type="button" data-reset-code>Làm lại code</button>
      </header>
      <label class="visually-hidden" for="codeEditor">Nhập code JavaScript</label>
      <textarea id="codeEditor" class="code-editor form-control" spellcheck="false">${escape(value)}</textarea>
      <div class="editor-actions d-flex justify-content-between align-items-center gap-2">
        <button class="btn btn-outline-light" type="button" data-run-code>Chạy code</button>
        <button class="btn btn-warning fw-bold" type="button" data-check-code>Kiểm tra bài</button>
      </div>
      <section class="io-requirements" aria-label="Yêu cầu input và output">
        <div class="io-requirement">
          <span class="io-label">INPUT / YÊU CẦU</span>
          <strong>${escape(taskBrief?.title ?? "Bài tập")}</strong>
          <p>${escape(taskBrief?.description ?? "Hoàn thành các bài tập ở danh sách bên trái.")}</p>
        </div>
        <div class="io-requirement io-output-requirement">
          <span class="io-label">OUTPUT MONG ĐỢI</span>
          <p>In kết quả theo yêu cầu bằng <code>console.log()</code>. Kết quả chạy sẽ hiện ở Console bên dưới.</p>
        </div>
      </section>
      <section class="console-panel" aria-live="polite">
        <header class="console-heading d-flex justify-content-between align-items-center"><h3>Console</h3><button class="btn btn-sm btn-link" type="button" data-clear-console>Xóa</button></header>
        <pre class="console-output">${escape(output || "Nhấn “Chạy code” để xem kết quả.")}</pre>
      </section>
      ${feedback ? `<div class="alert alert-${escape(feedbackType)} code-feedback" role="alert">${escape(feedback)}</div>` : ""}
      <details class="solution-details m-3">
        <summary>Xem lời giải tham khảo</summary>
        <div class="solution-body"><p class="text-warning">Hãy tự thử ít nhất một lần trước khi xem lời giải.</p>${solution || "<p>Chưa có lời giải cho bài này.</p>"}</div>
      </details>
      <footer class="lesson-pager d-flex justify-content-between gap-2 mt-auto">
        <button class="btn btn-outline-light" type="button" data-previous ${previousDisabled ? "disabled" : ""}>← Bài trước</button>
        <button class="btn btn-outline-light fw-bold lesson-next-button" type="button" data-next ${nextDisabled ? 'disabled title="Hoàn thành bài tập và kiểm tra bài để tiếp tục"' : ""}>${escape(nextLabel)} →</button>
      </footer>
    </section>`;
}

function escape(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
