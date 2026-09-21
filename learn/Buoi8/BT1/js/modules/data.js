let todos = [];

export const getTodos = () => [...todos];

export const addTodo = (title) => {
  const newTodo = {
    id: Date.now(),
    title,
    completed: false
  };
  todos.push(newTodo);
  return newTodo;
};

export const toggleTodo = (index) => {
  if (todos[index]) {
    todos[index].completed = !todos[index].completed;
  }
};

export const updateTodo = (index, newTitle) => {
  if (todos[index] && newTitle.trim() !== '') {
    todos[index].title = newTitle.trim();
    return true;
  }
  return false;
};

export const deleteTodo = (index) => {
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
  }
};