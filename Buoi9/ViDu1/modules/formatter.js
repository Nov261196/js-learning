// Formatter — dinh dang hien thi
export const formatStudent = (student) => {
  return `${student.id} | ${student.name} | ${student.className} | ${student.score} |
${student.getResult()}`;
};
export const formatList = (students) => {
  const header = "Ma | Ten | Lop | Diem | Xep loai";
  const separator = "------|-------------|--------|------|--------";
  const rows = students.map((sv) => formatStudent(sv));
  return [header, separator, ...rows].join("\n");
};
export const formatStats = (stats) => {
  return [
    `=== THONG KE LOP ===`,
    `Tong so: ${stats.total}`,
    `Dat: ${stats.passed}`,
    `Chua dat: ${stats.failed}`,
    `Diem TB: ${stats.average.toFixed(2)}`,
  ].join("\n");
};
