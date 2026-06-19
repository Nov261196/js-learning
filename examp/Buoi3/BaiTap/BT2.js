const basic = ["HTML", "CSS", "JavaScript"];
const advanced = ["React", "Node.js", "Express"];

const allSubjects = [... basic, ...advanced];

const fullCurriculum =["Nhap mon IT", ...basic, ...advanced, "Do an tot nghiep"];
console.log("=== Chuong trinh hoc ===");
for (const subject of fullCurriculum) {
    console.log(subject);
}

console.log("Basic:", basic); // ["HTML", "CSS"]
console.log("Advanced:", advanced); // ["JavaScript", "React"]