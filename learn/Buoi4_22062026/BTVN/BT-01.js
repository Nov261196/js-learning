const csvStudents = [
  "SV01,Nguyen Van A,CDJS01,8.5",
  "SV02,Le Thi B,CDJS02,4.0",
  "SV03,Tran Van C,CDJS01,7.0",
  "SV04,Pham Thi D,CDJS03,9.5",
  "SV05,Hoang Van E,CDJS02,3.5"
];

let studentList = [];

for (const csvLine of csvStudents) {
  const parts = csvLine.split(",");
  const [id, name, className, scoreStr] = parts;
  const score = Number(scoreStr);
  
  const studentObject = { id, name, className, score };
  
  studentList = [...studentList, studentObject];
}

console.log(studentList);