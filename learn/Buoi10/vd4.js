
const students = [
    { id: "SV01", name: "    Nguyễn Minh An", className: "JS01", score: 8.5 },
    { id: "SV02", name: "   Trần Gia Bình", className: "JS01", score: 4.2 },
    { id: "SV03", name: "   Lê Hoàng Chi", className: "JS02", score: 7.6 },
    { id: "SV04", name: "   Phạm Anh Dũng", className: "JS02", score: 9.1 },
    { id: "SV05", name: "Võ Thu Em", className: "JS01", score: 5.0 },
    { id: "SV06", name: "Đỗ Quang Huy", className: "JS03", score: 3.8 },
    { id: "SV07", name: "Bùi Khánh Linh", className: "JS03", score: 8.0 },
    { id: "SV08", name: "Hồ Bảo Nam", className: "JS02", score: 6.4 },
    { id: "SV09", name: "Dương Ngọc Oanh", className: "JS01", score: 9.5 },
    { id: "SV10", name: "Mai Quốc Phúc", className: "JS03", score: 2.9 },
    { id: "SV11", name: "Cao Mỹ Tâm", className: "JS02", score: 7.0 },
    { id: "SV12", name: "Lý Đức Vinh", className: "JS03", score: 6.8 }
];



const rawNames = students.map((student) => student.name);


const cleanNames = rawNames.map((s) =>
    (s = s.trim().toLowerCase()) && s[0].toUpperCase() + s.slice(1));


const keyword = "sv01".trim().toLowerCase();

const searchStudents = students
    // 1. Chuẩn hóa lại tên của từng sinh viên
    .map((student) => ({
        ...student,
        name: student.name.trim().toLowerCase().replace(/^./, (c) => c.toUpperCase())
    }))
    // 2. Tiến hành lọc theo id hoặc name đã làm sạch
    .filter(({ id, name }) => {
        if (!keyword) return true; // Nếu keyword rỗng thì lấy hết
        return id.toLowerCase().includes(keyword) || name.toLowerCase().includes(keyword);
    });

console.log(searchStudents);

