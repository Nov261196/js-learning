const student = { id: "SV01", name: "Nguyen Van A" }; 

const studentWithScore = { ...student, score: 8.5 }; 

const studentWithClass = { ...studentWithScore, class: "CDJS01" }; 

const correctedStudent = { ...student, name: "Nguyen Van An" };

console.log(student); 

console.log(studentWithScore); 

console.log(studentWithClass); 

console.log(correctedStudent); 