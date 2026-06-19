const createStudent = (id, name, ...scores) => {
  const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;

  return {
    id,
    name,
    scores,
    average,
    isPassed: average >= 5,
  };
};

const sv1 = createStudent("SV01", "Lan", 8, 7, 9, 6);
const sv2 = createStudent("SV02", "Minh", 4, 5, 3);
const sv3 = createStudent("SV03", "Hoang", 6, 8, 7);

const initialStudents = [sv1, sv2, sv3];
const classList = [...initialStudents];

for (const sv of classList) {
  console.log(
    `Mã SV: ${sv.id} - Tên: ${sv.name} - ĐTB: ${sv.average} - Kết quả: ${sv.isPassed ? "Đạt" : "Trượt"}`,
  );
}

const sv4 = createStudent("SV04", "Tuấn", 9, 9, 10);
const newList = [...classList, sv4];

for (const sv of newList) {
  console.log(`Tên: ${sv.name} - ĐTB: ${sv.average}`);
}

console.log(
  `Số lượng sinh viên của danh sách classList gốc: ${classList.length}`,
);
console.log(`Số lượng sinh viên của danh sách newList mới: ${newList.length}`);
