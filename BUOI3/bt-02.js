const basic = ["HTML", "CSS"]
const advanced = ["JAVASCRIPT", "REACT"];

const allSubjects = [...basic, ...advanced];
const fullCurriculum = ["Nhap mon IT", ...basic, ...advanced, "Do An Tot Nghiep"];

console.log("=== Chuong trinh hoc ===");
for (const subject of fullCurriculum) {
    console.log(subject);
}

console.log("=== Kiem tra mang goc ===")
console.log("Basic:", basic);
console.log("Advanced:", advanced);




