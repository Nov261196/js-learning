import {addStudent, clearStudents, getAll, getFiltered, getStats, removeById, seedDemoStudents} from "./modules/studentService.js";
import {clearDemoMessage, clearMessage, renderReport, renderStats, renderStudents, showDemoMessage, showMessage} from "./modules/ui.js";
import {generateReport} from "./modules/report.js";
const form = document.querySelector("#student-form");
const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");
const studentList = document.querySelector("#student-list");
const loadDemoButton = document.querySelector("#load-demo");
const clearAllButton = document.querySelector("#clear-all");
const readFormData = () => {
  const data = new FormData(form);
  return {
    id: data.get("studentId"),
    name: data.get("studentName"),
    className: data.get("className"),
    score: data.get("score"),
  };
};
const updateScreen = () => {
  const filteredStudents = getFiltered({
    keyword: searchInput.value,
    status: statusFilter.value,
  });
  renderStudents(filteredStudents);
  renderStats(getStats());
  renderReport(generateReport(getAll()));
};
form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage();
  clearDemoMessage();
  const studentData = readFormData();
  try {
    const student = addStudent(studentData);
    form.reset();
    form.querySelector("#student-id").focus();
    showMessage(`Đã thêm ${student.name}.`, "success");
    updateScreen();
  } catch (error) {
    showMessage(error.message, "error");
  }
});
searchInput.addEventListener("input", updateScreen);
statusFilter.addEventListener("change", updateScreen);
form.addEventListener("input", () => {
  clearMessage();
});
loadDemoButton.addEventListener("click", () => {
  seedDemoStudents();
  clearMessage();
  showDemoMessage("Đã Nạp Dữ Liệu Mẫu Thành Công.", "success");
  updateScreen();
});
clearAllButton.addEventListener("click", () => {
  clearStudents();
  clearMessage();
  showDemoMessage("Đã Xoá Toàn Bộ Danh Sách Hiển Thị.", "success");
  updateScreen();
});
studentList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action='remove']");
  if (!button) return;
  const removed = removeById(button.dataset.id);
  if (removed) {
    showMessage(`Đã xóa sinh viên ${button.dataset.id}.`, "success");
    updateScreen();
  }
});
updateScreen();
