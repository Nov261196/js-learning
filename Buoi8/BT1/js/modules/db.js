// Biến private lưu trữ dữ liệu (Database)
let users = [
{ id: 1, name: "Nguyen Van A", age: 20 },
{ id: 2, name: "Le Thi B", age: 22 }
];
// Hàm tạo ID tự động
const generateId = () => {
return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
};
// --- CÁC THAO TÁC CRUD ---
// R - Read: Lấy danh sách (trả về bản sao để bảo vệ dữ liệu gốc)
export const getAllUsers = () => [...users];
// R - Read: Lấy 1 user theo ID
export const getUserById = (id) => users.find(u => u.id === id);
// C - Create: Thêm user mới
export const createUser = (name, age) => {
const newUser = { id: generateId(), name, age };
users.push(newUser);
return newUser;
};
// U - Update: Cập nhật thông tin user
export const updateUser = (id, newName, newAge) => {
const index = users.findIndex(u => u.id === id);
if (index !== -1) {
users[index] = { ...users[index], name: newName, age: newAge };
return true;
}
return false;
};
// D - Delete: Xóa user
export const deleteUser = (id) => {
const initialLength = users.length;
users = users.filter(u => u.id !== id);
return users.length < initialLength; // Trả về true nếu xóa thành công
};