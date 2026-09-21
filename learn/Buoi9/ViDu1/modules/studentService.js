// Service — logic nghiep vu (CRUD)
import Student from "../Student.js";
// Mang luu tru sinh vien (private cho module nay)
let students = [];
// Them sinh vien moi
export const addStudent = (id, name, className, score) => {
  const sv = new Student(id, name, className, score);
  students.push(sv);
  return sv;
};
// Tim theo ma
export const findById = (id) => {
  return students.find((sv) => sv.id === id) || null;
};
// Loc sinh vien dat
export const filterPassed = () => {
  return students.filter((sv) => sv.isPassed());
};
// Loc sinh vien chua dat
export const filterFailed = () => {
  return students.filter((sv) => !sv.isPassed());
};
// Lay tat ca
export const getAll = () => {
  return [...students]; // Tra ve ban sao
};
// Tinh diem trung binh lop
export const getClassAverage = () => {
  if (students.length === 0) return 0;
  const total = students.reduce((sum, sv) => sum + sv.score, 0);
  return total / students.length;
};
// Xoa theo ma
export const removeById = (id) => {
  const index = students.findIndex((sv) => sv.id === id);
  if (index !== -1) {
    return students.splice(index, 1)[0];
  }
  return null;
};
// Dem so luong
export const count = () => students.length;
