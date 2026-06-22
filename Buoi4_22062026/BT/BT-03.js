const csvLine = "SV05, Nguyen Thi E ,CDJS03, 9, Gioi";
const parts = csvLine.split(",");

const [id, ...details] = parts;

const name = details;      
const className = details; 
const scoreStr = details;  
const rank = details;       

const score = Number(scoreStr); 

console.log(`${name} (${id}) - Lop ${className} - Diem: ${score} - Xep loai: ${rank}`);
console.log(`Ma: ${id}`);
console.log(`So Truong Con Lai: ${details.length}`);

