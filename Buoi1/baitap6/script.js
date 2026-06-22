// 1. Tạo các biến chứa thông tin profile cá nhân
const profileData = {
    fullName: "Nguyễn Văn An",
    className: "WD18301",
    email: "annv@fpt.edu.vn"
};

// 2. Có ít nhất một dòng console.log để kiểm tra dữ liệu trước khi đưa lên giao diện
console.log("Dữ liệu profile hiện tại:", profileData);

// 3. Chọn các phần tử cần hiển thị bằng querySelector
const elFullName = document.querySelector("#fullName");
const elClassName = document.querySelector("#className");
const elEmail = document.querySelector("#email");

// 4. Gán textContent để đưa dữ liệu lên giao diện (đáp ứng > 3 thông tin)
if (elFullName && elClassName && elEmail) {
    elFullName.textContent = profileData.fullName;
    elClassName.textContent = profileData.className;
    elEmail.textContent = profileData.email;
    
    console.log("Đã cập nhật thông tin lên giao diện thành công!");
} else {
    console.error("Lỗi: Không tìm thấy các selector ID trong HTML.");
}   