const listEl = document.getElementById('list');

export const renderList = (todos, onDelete, onToggle, onEdit) => {
  listEl.innerHTML = todos.length === 0 
    ? `<li class="empty-state">Chưa có công việc nào. Hãy thêm công việc mới!</li>` 
    : '';

  if (todos.length === 0) return;

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');

    li.innerHTML = `
      <div class="task-content">
        <input type="checkbox" class="task-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="task-text" title="Nhấp đúp để chỉnh sửa">${todo.title}</span>
      </div>
      <div class="action-btns">
        <button class="edit-btn" title="Chỉnh sửa">
          <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        </button>
        <button class="delete-btn" title="Xóa">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
    `;

    // Hàm xử lý sửa
    const handleEdit = () => {
      const newTitle = prompt('Chỉnh sửa tên công việc:', todo.title);
      if (newTitle && newTitle.trim() !== '') {
        onEdit(index, newTitle.trim());
      }
    };

    // Gắn sự kiện
    li.querySelector('.task-checkbox').addEventListener('change', () => onToggle(index));
    li.querySelector('.delete-btn').addEventListener('click', () => onDelete(index));
    li.querySelector('.edit-btn').addEventListener('click', handleEdit);
    li.querySelector('.task-text').addEventListener('dblclick', handleEdit);

    listEl.appendChild(li);
  });
};