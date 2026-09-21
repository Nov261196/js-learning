const student = { id: "SV01", name: "Nguyen Van A" };

const studentWithScore = { ...student, score: "8.5" };

const studentWithClass = { ...student, class: "CDJ001" };

const correctedStudent = { ...student, ...studentWithScore, ...studentWithClass, name: "Nguyen Van An" };

console.log(student);
console.log(studentWithScore);
console.log(studentWithClass);
console.log(correctedStudent);




