import request from 'supertest';
import app from '../../app';

// NOTE: These tests assume a test database and that migrations have been run.

const registerAndLogin = async () => {
  const email = `user_${Date.now()}_${Math.random().toString(16).slice(2)}@example.com`;
  const password = 'password123';

  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({ email, password })
    .expect(201);

  return registerRes.body.token as string;
};

describe('Tasks API', () => {
  it('creates, lists, gets, updates, and deletes a task', async () => {
    const token = await registerAndLogin();

    // Create
    const createRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test task',
        description: 'A test task',
        status: 'todo',
        priority: 'medium',
      })
      .expect(201);

    const taskId = createRes.body.id;

    // List
    const listRes = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(listRes.body.data)).toBe(true);
    expect(listRes.body.meta).toBeDefined();

    // Get
    const getRes = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(getRes.body.id).toBe(taskId);

    // Update
    const updateRes = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'done' })
      .expect(200);

    expect(updateRes.body.status).toBe('done');

    // Delete
    await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});
