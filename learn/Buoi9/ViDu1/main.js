// Main — ket noi tat ca module va chay chuong trinh
import {validateStudent} from "./modules/validator.js";
import {addStudent, getAll, filterPassed, filterFailed, getClassAverage, count} from "./modules/studentService.js";
import {formatList, formatStats} from "./modules/formatter.js";
// === Du lieu mau ===
const sampleData = [
  {id: "SV01", name: "Nguyen Van An", className: "CDJS01", score: 8.5},
  {id: "SV02", name: "Tran Thi Binh", className: "CDJS01", score: 4},
  {id: "SV03", name: "Le Van Chi", className: "CDJS02", score: 6.5},
  {id: "SV04", name: "Pham Thi Dung", className: "CDJS01", score: 9},
  {id: "SV05", name: "Hoang Van Em", className: "CDJS02", score: 3.5},
];
// === Validate va them sinh vien ===
console.log("=== NHAP SINH VIEN ===");
for (const {id, name, className, score} of sampleData) {
  const {isValid, errors} = validateStudent(id, name, score);
  if (isValid) {
    addStudent(id, name, className, score);
    console.log(`✓ Da them: ${id} - ${name}`);
  } else {
    console.log(`✗ Loi: ${errors.join(", ")}`);
  }
}
// === In danh sach ===
console.log("\n=== DANH SACH SINH VIEN ===");
console.log(formatList(getAll()));
// === Thong ke ===
const stats = {
  total: count(),
  passed: filterPassed().length,
  failed: filterFailed().length,
  average: getClassAverage(),
};
console.log("\n" + formatStats(stats));
