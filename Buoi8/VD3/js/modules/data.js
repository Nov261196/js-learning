// Khởi tạo mảng lưu trữ
let todos = [];

// Lấy danh sách todo
export const getTodos = () => [...todos];

// C - Create: Thêm công việc mới
export const addTodo = (title) => {
  const newTodo = {
    id: Date.now(),
    title,
    completed: false
  };
  todos.push(newTodo);
  return newTodo;
};

// U - Update: Đổi trạng thái hoàn thành (Check/Uncheck)
export const toggleTodo = (index) => {
  if (todos[index]) {
    todos[index].completed = !todos[index].completed;
  }
};

// U - Update: Sửa tên công việc
export const updateTodo = (index, newTitle) => {
  if (todos[index] && newTitle.trim() !== '') {
    todos[index].title = newTitle.trim();
    return true;
  }
  return false;
};

// D - Delete: Xóa công việc
export const deleteTodo = (index) => {
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
  }
};