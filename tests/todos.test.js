const request = require('supertest');
const app = require('../src/app');
const store = require('../src/todoStore');

beforeEach(() => {
  store.reset();
});

// PBI-1: Todo CRUD
describe('PBI-1: Todo CRUD', () => {
  test('TC-1.1: POST /todos with valid title returns 201 and created todo', async () => {
    const res = await request(app).post('/todos').send({ title: 'Buy milk' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Buy milk', completed: false });
    expect(res.body.id).toBeDefined();
  });

  test('TC-1.2: POST /todos without title returns 400', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.status).toBe(400);
  });

  test('TC-1.3: GET /todos returns all todos', async () => {
    await request(app).post('/todos').send({ title: 'A' });
    await request(app).post('/todos').send({ title: 'B' });

    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  test('TC-1.4: GET /todos/:id returns the todo for an existing id', async () => {
    const created = await request(app).post('/todos').send({ title: 'A' });

    const res = await request(app).get(`/todos/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('A');
  });

  test('TC-1.5: GET /todos/:id returns 404 for a non-existing id', async () => {
    const res = await request(app).get('/todos/999');
    expect(res.status).toBe(404);
  });

  test('TC-1.6: PUT /todos/:id updates the title', async () => {
    const created = await request(app).post('/todos').send({ title: 'Old' });

    const res = await request(app)
      .put(`/todos/${created.body.id}`)
      .send({ title: 'New' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('New');
  });

  test('TC-1.7: DELETE /todos/:id removes the todo and returns 204', async () => {
    const created = await request(app).post('/todos').send({ title: 'A' });

    const del = await request(app).delete(`/todos/${created.body.id}`);
    expect(del.status).toBe(204);

    const get = await request(app).get(`/todos/${created.body.id}`);
    expect(get.status).toBe(404);
  });

  test('TC-1.8: DELETE /todos/:id returns 404 for a non-existing id', async () => {
    const res = await request(app).delete('/todos/999');
    expect(res.status).toBe(404);
  });
});

// PBI-2: Todo completion status
describe('PBI-2: Todo completion status', () => {
  test('TC-2.1: PATCH /todos/:id/complete sets completed to true', async () => {
    const created = await request(app).post('/todos').send({ title: 'A' });

    const res = await request(app).patch(`/todos/${created.body.id}/complete`);
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  test('TC-2.2: PATCH /todos/:id/incomplete sets completed to false', async () => {
    const created = await request(app).post('/todos').send({ title: 'A' });
    await request(app).patch(`/todos/${created.body.id}/complete`);

    const res = await request(app).patch(`/todos/${created.body.id}/incomplete`);
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(false);
  });

  test('TC-2.3: complete/incomplete return 404 for non-existing id', async () => {
    const complete = await request(app).patch('/todos/999/complete');
    const incomplete = await request(app).patch('/todos/999/incomplete');
    expect(complete.status).toBe(404);
    expect(incomplete.status).toBe(404);
  });
});

// PBI-3: Filtering by completion status
describe('PBI-3: Filter todos by status', () => {
  beforeEach(async () => {
    const a = await request(app).post('/todos').send({ title: 'Done task' });
    await request(app).post('/todos').send({ title: 'Pending task' });
    await request(app).patch(`/todos/${a.body.id}/complete`);
  });

  test('TC-3.1: GET /todos?completed=true returns only completed todos', async () => {
    const res = await request(app).get('/todos?completed=true');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe('Done task');
  });

  test('TC-3.2: GET /todos?completed=false returns only pending todos', async () => {
    const res = await request(app).get('/todos?completed=false');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe('Pending task');
  });

  test('TC-3.3: GET /todos without filter returns all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});
