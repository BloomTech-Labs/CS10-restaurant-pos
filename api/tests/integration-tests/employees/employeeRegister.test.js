const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;

// jest.setTimeout(100000);

describe('employeeRegister', () => {
  beforeAll((done) => {
    loginAdmin(server)
      .then(res => {
        token = res;
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  // Valid
  it('[Auth] POST: Works with all required fields', async () => {
    const res = await request(server)
      .post('/api/employees/register')
      .set('Authorization', `${token}`)
      .send({
        name: 'Fred Fredson',
        email: 'FredFredson@gmail.com',
        pass: 'password'
      });
    expect(res.status).toBe(201);
  });


  // Invalid
  it('POST: Does not work without all required fields', async () => {
    const res = await request(server)
      .post('/api/employees/register')
      .set('Authorization', `${token}`)
      .send({
        name: 'Fred Fredson',
      });
    expect(res.status).toBe(422);
  });

  // [Not Authorized]
  it('[Not Auth] POST: Does not work without authorization', async () => {
    const res = await request(server)
      .post('/api/employees/register')
      .send({
        name: 'Fred Fredson',
        email: 'fred@fredson.biz',
        pass: 'password'
      });
    expect(res.status).toBe(401);
  });
});
