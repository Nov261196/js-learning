const csvLine = "SV03,Tran Thi C,CDJS02,7.5";
const parts = csvLine.split(",");
const [id, name, className, scoreStr] = parts;
const score = Number(scoreStr);
console.log(`${name} (${id}) - Lop ${className} - Diem: ${score}`);