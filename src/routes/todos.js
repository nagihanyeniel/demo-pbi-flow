const express = require('express');
const store = require('../todoStore');

const router = express.Router();

// PBI-1: Todo CRUD
router.get('/', (req, res) => {
  let todos = store.getAll();

  // PBI-3: filter by completed status via ?completed=true|false
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === 'true';
    todos = todos.filter((t) => t.completed === completed);
  }

  res.json(todos);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }
  const todo = store.create({ title });
  res.status(201).json(todo);
});

router.get('/:id', (req, res) => {
  const todo = store.getById(Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'todo not found' });
  res.json(todo);
});

router.put('/:id', (req, res) => {
  const todo = store.update(Number(req.params.id), { title: req.body.title });
  if (!todo) return res.status(404).json({ error: 'todo not found' });
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const removed = store.remove(Number(req.params.id));
  if (!removed) return res.status(404).json({ error: 'todo not found' });
  res.status(204).send();
});

// PBI-2: mark complete / incomplete
router.patch('/:id/complete', (req, res) => {
  const todo = store.update(Number(req.params.id), { completed: true });
  if (!todo) return res.status(404).json({ error: 'todo not found' });
  res.json(todo);
});

router.patch('/:id/incomplete', (req, res) => {
  const todo = store.update(Number(req.params.id), { completed: false });
  if (!todo) return res.status(404).json({ error: 'todo not found' });
  res.json(todo);
});

module.exports = router;
