const listEl = document.getElementById('list');

export const renderList = (todos, onDelete, onToggle, onEdit) => {
  listEl.innerHTML = '';

  if (todos.length === 0) {
    listEl.innerHTML = `<li class="empty-state">Chưa có công việc nào. Hãy thêm công việc mới!</li>`;
    return;
  }

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <div class="task-content">
        <input type="checkbox" class="task-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="task-text" title="Nhấp đúp để sửa">${todo.title}</span>
      </div>
      <div class="action-btns">
        <button class="edit-btn" aria-label="Sửa" title="Sửa">
          <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        </button>
        <button class="delete-btn" aria-label="Xóa" title="Xóa">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
    `;

    // Gắn sự kiện Check
    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => onToggle(index));

    // Gắn sự kiện Sửa
    const taskText = li.querySelector('.task-text');
    const editBtn = li.querySelector('.edit-btn');
    const handleEdit = () => {
      const newTitle = prompt('Chỉnh sửa công việc:', todo.title);
      if (newTitle !== null && newTitle.trim() !== '') {
        onEdit(index, newTitle);
      }
    };
    editBtn.addEventListener('click', handleEdit);
    taskText.addEventListener('dblclick', handleEdit);

    // Gắn sự kiện Xóa
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => onDelete(index));

    listEl.appendChild(li);
  });
};