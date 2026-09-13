import Student from "./student.js";
import {validateStudent} from "./validator.js";

let students = [];
const demoStudents = [
  {id: "SV01", name: "Nguyễn Văn An", className: "CDJS01", score: 8.8},
  {id: "SV02", name: "Trần Văn Đông", className: "CDJS01", score: 7.1},
  {id: "SV03", name: "Lê Minh Đức", className: "CDJS02", score: 4.6},
  {id: "SV04", name: "Phạm Gia Linh", className: "CDJS02", score: 9.2},
  {id: "SV05", name: "Bùi Khánh Vy", className: "CDJS03", score: 6.8},
  {id: "SV06", name: "Đỗ Anh Quân", className: "CDJS03", score: 5.4},
  {id: "SV07", name: "Ngô Thảo My", className: "CDJS04", score: 8.1},
  {id: "SV08", name: "Phan Quốc Bảo", className: "CDJS04", score: 3.9},
  {id: "SV09", name: "Huỳnh Minh Khoa", className: "CDJS05", score: 7.6},
  {id: "SV10", name: "Võ Ngọc Hân", className: "CDJS05", score: 9.5},
  {id: "SV11", name: "Trương Gia Huy", className: "CDJS06", score: 6.2},
  {id: "SV12", name: "Lý Thanh Trúc", className: "CDJS06", score: 4.8},
];

export const addStudent = ({id, name, className, score}) => {
  const validation = validateStudent({id, name, className, score});
  if (!validation.isValid) {
    throw new Error(validation.errors.join(", "));
  }

  const normalizedStudent = validation.value;
  const normalizedId = normalizedStudent.id;

  if (students.some((student) => student.id === normalizedId)) {
    throw new Error(`Mã ${normalizedId} đã tồn tại.`);
  }

  const student = new Student(
    normalizedStudent.id,
    normalizedStudent.name,
    normalizedStudent.className,
    normalizedStudent.score,
  );

  students = [...students, student];
  return student;
};
export const removeById = (id) => {
  const before = students.length;
  students = students.filter((student) => student.id !== id);
  return students.length < before;
};
export const getAll = () => [...students];
export const getFiltered = ({keyword = "", status = "all"}) => {
  const normalizedKeyword = keyword.trim().toLocaleLowerCase("vi");
  return students.filter((student) => {
    const matchesText =
      student.id.toLowerCase().includes(normalizedKeyword) ||
      student.name.toLocaleLowerCase("vi").includes(normalizedKeyword);
    const matchesStatus =
      status === "all" || (status === "passed" && student.isPassed()) || (status === "failed" && !student.isPassed());
    return matchesText && matchesStatus;
  });
};
export const getStats = () => {
  const total = students.length;
  const passed = students.filter((student) => student.isPassed()).length;
  const average = total ? students.reduce((sum, student) => sum + student.score, 0) / total : 0;
  return {total, passed, failed: total - passed, average};
};

export const seedDemoStudents = () => {
  students = demoStudents.map(({id, name, className, score}) => new Student(id, name, className, score));
  return getAll();
};

export const clearStudents = () => {
  students = [];
  return getAll();
};
