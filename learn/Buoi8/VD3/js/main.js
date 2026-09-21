import { addTodo, deleteTodo, toggleTodo, updateTodo, getTodos } from './modules/data.js';
import { renderList } from './modules/render.js';

const btn = document.getElementById('addTaskBtn');
const input = document.getElementById('taskInput');

// Cập nhật lại giao diện khi dữ liệu thay đổi
const updateUI = () => {
  renderList(
    getTodos(),
    // Callback Xóa
    (index) => {
      deleteTodo(index);
      updateUI();
    },
    // Callback Check/Uncheck
    (index) => {
      toggleTodo(index);
      updateUI();
    },
    // Callback Sửa
    (index, newTitle) => {
      updateTodo(index, newTitle);
      updateUI();
    }
  );
};

// Thêm công việc
btn.addEventListener('click', () => {
  const task = input.value.trim();

  if (task !== '') {
    addTodo(task);
    input.value = '';
    updateUI();
  }
});

// Nhấn Enter để thêm
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    btn.click();
  }
});

// Khởi tạo giao diện ban đầu
updateUI();