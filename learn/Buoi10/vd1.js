const original = [8, 7, 9];
const alias = original;
alias.push(10);


console.log(original);


const copy1 = [...original];
const copy2 = original.slice();

const students = [{ Nam: "An", score: 8 }];
const shallow = [...students];
shallow[0].score = 10;

console.log(students[0].score);


const updated = students.map(student =>
    student.name === "An"
        ? { ...student, score: 10 }
        : student
);