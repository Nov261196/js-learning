const studentData = ["SV01", "Nguyen Van A", "CDJS01", 8.5];
const [id, name, className, score = 0] = studentData;


console.log(`Ma: ${id}`);
console.log(`Ten: ${name}`);
console.log(`Lop: ${className}`);
console.log(`Diem: ${score}`);