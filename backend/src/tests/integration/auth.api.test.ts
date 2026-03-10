import request from 'supertest';
import app from '../../app';

// NOTE: These tests assume a test database and that migrations have been run.
// They are basic happy-path tests to validate the API contract.

describe('Auth API', () => {
  const baseUrl = '/api/auth';

  const randomEmail = () => `user_${Date.now()}_${Math.random().toString(16).slice(2)}@example.com`;

  it('registers a new user and returns token', async () => {
    const email = randomEmail();

    const res = await request(app)
      .post(`${baseUrl}/register`)
      .send({ email, password: 'password123' })
      .expect(201);

    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe(email);
    expect(res.body).toHaveProperty('token');
  });

  it('logs in an existing user and returns token', async () => {
    const email = randomEmail();

    await request(app)
      .post(`${baseUrl}/register`)
      .send({ email, password: 'password123' })
      .expect(201);

    const res = await request(app)
      .post(`${baseUrl}/login`)
      .send({ email, password: 'password123' })
      .expect(200);

    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(email);
    expect(res.body).toHaveProperty('token');
  });
});
