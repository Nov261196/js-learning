
// Mô phỏng chuỗi quy trình đăng ký môn học của sinh viên
function verifyStudent(studentId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (studentId === "SV102") {
                resolve({ id: "SV102", name: "Trần Thị Mai", tuitionPaid: true });
            } else {
                reject(new Error("Không tìm thấy thông tin sinh viên!"));
            }
        }, 500);
    });
}
function checkTuition(student) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (student.tuitionPaid) {
                resolve(student);
            } else {
                reject(new Error(`Sinh viên ${student.name} chưa đóng học phí!`));
            }
        }, 400);
    });
}
function registerCourse(student, courseCode) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                studentName: student.name,
                course: courseCode,
                registeredAt: new Date().toISOString()
            });
        }, 600);
    });
}
// Bắt đầu chuỗi xử lý (Promise Chain):
verifyStudent("SV102")
    .then((student) => {
        console.log("1. Xác thực sinh viên thành công:", student.name);
        return checkTuition(student); // Trả về Promise tiếp theo
    })
    .then((verifiedStudent) => {
        console.log("2. Kiểm tra học phí hợp lệ.");
        return registerCourse(verifiedStudent, "CS301 - Lập trình Web Nâng Cao");
    })
    .then((result) => {
        console.log("3. Đăng ký môn học thành công rực rỡ:", result);
    })
    .catch((error) => {
        // Bắt bất kỳ lỗi nào xảy ra ở TẤT CẢ các bước trên
        console.error("Lỗi quy trình:", error.message);
    })
    .finally(() => {
        console.log("Hoàn tất quy trình đăng ký môn học.");
    });