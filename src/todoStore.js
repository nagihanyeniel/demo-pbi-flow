let todos = [];
let nextId = 1;

function reset() {
  todos = [];
  nextId = 1;
}

function getAll() {
  return todos;
}

function getById(id) {
  return todos.find((t) => t.id === id);
}

function create({ title }) {
  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  return todo;
}

function update(id, changes) {
  const todo = getById(id);
  if (!todo) return null;
  Object.assign(todo, changes);
  return todo;
}

function remove(id) {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}

module.exports = { reset, getAll, getById, create, update, remove };
