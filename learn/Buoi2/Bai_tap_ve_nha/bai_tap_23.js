// 23. createEmail(firstName, lastName, domain = "student.edu.vn") — tạo email dạng
// firstname.lastname@domain.

const createEmail = (firstName , lastName , domain = "student.edu.vn") => `${firstName}.${lastName}@${domain}`;

console.log(createEmail("Vu","DangNguyen"));
