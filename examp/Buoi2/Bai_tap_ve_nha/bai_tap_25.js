// 25. introduce(name, className = "CDJS01", school = "Cao dang CNTT") — trả về câu giới thiệu
// bằng template literal.


const introduce = (name , className = "CDJS01", school = "Cao dang CNTT") => `Sinh Vien ${name} Lop ${className} Truong ${school}`;

console.log(introduce("Dang Nguyen Hoang Vu"));