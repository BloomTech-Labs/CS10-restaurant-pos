const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');

// jest.setTimeout(100000);

describe('adminRegister', () => {
  afterAll((done) => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  it('POST: Does not work without valid credentials', async () => {
    const res = await request(server)
      .post('/api/employees/admin/register')
      .send({
        name: 'John',
        email: 'john@test.com'
      });

    expect(res.status).toEqual(422);
  });

  it('POST: Works with valid credentials', async () => {
    const res = await request(server)
      .post('/api/employees/admin/register')
      .send(
        {
          name: 'John',
          email: 'john@test.com',
          pass: 'password'
        }
      );

    expect(res.status).toEqual(200);
  });
});
