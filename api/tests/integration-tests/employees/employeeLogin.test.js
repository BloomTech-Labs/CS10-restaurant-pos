const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let pin;

// jest.setTimeout(100000);

describe('employeeLogin', () => {
  beforeAll((done) => {
    loginAdmin(server)
      .then(async resToken => {
        token = resToken;
        const response = await request(server)
          .post('/api/employees/register')
          .set('Authorization', token)
          .send({
            name: 'Fred Fredson',
            email: 'fred@fredson.biz',
            pass: 'password'
          });

        pin = response.body.pin; // eslint-disable-line

        done();
      }).catch(err => {
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
      .post('/api/employees/login')
      .set('Authorization', `${token}`)
      .send({
        pin,
      });
    expect(res.status).toBe(200);
  });

  // Invalid
  it('POST: Does not work without all required fields', async () => {
    const res = await request(server)
      .post('/api/employees/login')
      .set('Authorization', `${token}`)
      .send({});
    expect(res.status).toBe(422);
  });
});
