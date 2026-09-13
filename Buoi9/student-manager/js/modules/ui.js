const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Khong tim thay phan tu ${selector} trong giao dien.`);
  }
  return element;
};

const elements = {
  list: getElement("#student-list"),
  emptyState: getElement("#empty-state"),
  resultCount: getElement("#result-count"),
  message: getElement("#form-message"),
  demoMessage: getElement("#demo-message"),
  total: getElement("#stat-total"),
  passed: getElement("#stat-passed"),
  failed: getElement("#stat-failed"),
  average: getElement("#stat-average"),
  reportSummary: getElement("#report-summary"),
  reportHighestName: getElement("#report-highest-name"),
  reportHighestScore: getElement("#report-highest-score"),
  reportLowestName: getElement("#report-lowest-name"),
  reportLowestScore: getElement("#report-lowest-score"),
  reportGioi: getElement("#report-gioi"),
  reportKha: getElement("#report-kha"),
  reportTrungBinh: getElement("#report-trung-binh"),
  reportYeu: getElement("#report-yeu"),
};
const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatDisplayName = (value) =>
  String(value)
    .trim()
    .toLocaleLowerCase("vi")
    .replace(/\s+/g, " ")
    .replace(/(^|\s)\S/g, (character) => character.toLocaleUpperCase("vi"));
export const renderStudents = (students) => {
  elements.list.innerHTML = students
    .map(
      (student) => `
<tr>
<td><strong>${escapeHtml(student.id)}</strong></td>
<td>${escapeHtml(student.name)}</td>
<td>${escapeHtml(student.className)}</td>
<td>${student.score.toFixed(1)}</td>
<td>
<span class="badge ${student.isPassed() ? "badge--passed" : "badge--failed"}">
${escapeHtml(student.getResult())}
</span>
</td>
<td>
<button class="button button--danger" data-action="remove" data-id="${escapeHtml(student.id)}">
Xóa
</button>
</td>
</tr>
`,
    )
    .join("");
  elements.emptyState.hidden = students.length > 0;
  elements.emptyState.textContent = "Chưa có sinh viên phù hợp.";
  elements.resultCount.textContent = `${students.length} kết quả`;
};
export const renderStats = ({total, passed, failed, average}) => {
  elements.total.textContent = total;
  elements.passed.textContent = passed;
  elements.failed.textContent = failed;
  elements.average.textContent = average.toFixed(2);
};
export const showMessage = (text, type = "success") => {
  elements.message.textContent = text;
  elements.message.className = `message message--${type}`;
  elements.message.hidden = false;
};

export const showDemoMessage = (text, type = "success") => {
  elements.demoMessage.textContent = text;
  elements.demoMessage.className = `message message--${type}`;
  elements.demoMessage.hidden = false;
};

export const clearDemoMessage = () => {
  elements.demoMessage.textContent = "";
  elements.demoMessage.className = "message";
  elements.demoMessage.hidden = true;
};

export const clearMessage = () => {
  elements.message.textContent = "";
  elements.message.className = "message";
  elements.message.hidden = true;
};

export const renderReport = (report) => {
  if (!report.total) {
    elements.reportSummary.textContent = "Chưa có dữ liệu để lập báo cáo.";
    elements.reportHighestName.textContent = "-";
    elements.reportHighestScore.textContent = "-";
    elements.reportLowestName.textContent = "-";
    elements.reportLowestScore.textContent = "-";
    elements.reportGioi.textContent = "0";
    elements.reportKha.textContent = "0";
    elements.reportTrungBinh.textContent = "0";
    elements.reportYeu.textContent = "0";
    return;
  }

  elements.reportSummary.textContent = `Lớp hiện có ${report.total} sinh viên, điểm trung bình ${report.average.toFixed(2)}.`;
  elements.reportHighestName.textContent = formatDisplayName(report.highest.name);
  elements.reportHighestScore.textContent = `${report.highest.score.toFixed(1)} điểm • ${report.highest.className}`;
  elements.reportLowestName.textContent = formatDisplayName(report.lowest.name);
  elements.reportLowestScore.textContent = `${report.lowest.score.toFixed(1)} điểm • ${report.lowest.className}`;
  elements.reportGioi.textContent = String(report.distribution["Giỏi"]);
  elements.reportKha.textContent = String(report.distribution["Khá"]);
  elements.reportTrungBinh.textContent = String(report.distribution["Trung bình"]);
  elements.reportYeu.textContent = String(report.distribution["Yếu"]);
};
