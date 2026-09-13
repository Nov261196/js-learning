// Import từ các file trong thư mục modules (cùng cấp với main.js)
import { addTodo, deleteTodo, toggleTodo, updateTodo, getTodos } from './modules/data.js';
import { renderList } from './modules/render.js';

const btn = document.getElementById('addTaskBtn');
const input = document.getElementById('taskInput');

// Hàm cập nhật giao diện
const updateUI = () => {
  renderList(
    getTodos(),
    (index) => {
      deleteTodo(index);
      updateUI();
    },
    (index) => {
      toggleTodo(index);
      updateUI();
    },
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

// Render ban đầu
updateUI();