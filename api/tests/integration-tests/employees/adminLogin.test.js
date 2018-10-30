const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');

// jest.setTimeout(100000);

describe('adminLogin', () => {
  beforeAll((done) => {
    request(server)
      .post('/api/employees/admin/register')
      .send({
        name: 'John',
        email: 'john@test.com',
        pass: 'password'
      })
      .end(() => done());
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  it('POST: Does not work without all required fields', async () => {
    const res = await request(server)
      .post('/api/employees/admin/login')
      .send({
        email: 'john@test.com'
      });
    expect(res.status).toBe(422);
  });

  it('POST: Works with all required fields', async () => {
    const res = await request(server)
      .post('/api/employees/admin/login')
      .send({
        email: 'john@test.com',
        pass: 'password'
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
