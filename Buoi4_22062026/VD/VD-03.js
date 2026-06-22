const team = ["Phong", "An", "Binh", "Chi", "Dung"];
const [leader, ...members] = team;
console.log(`Truong nhom: ${leader}`);
console.log(`Thanh vien: ${members.join(", ")}`);
console.log(`So thanh vien: ${members.length}`);