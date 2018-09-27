const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let pin;

describe('employeeLogin', () => {
  beforeAll(async (done) => {
    loginAdmin(server)
      .then(async resToken => {
        token = resToken;
        request(server)
          .post('/api/employees/register')
          .set('Authorization', token)
          .send({
            name: 'Fred Fredson',
            pass: 'password'
          })
          .then(response => {
            pin = response.body.pin; // eslint-disable-line
            return request(server)
              .post('/api/employees/login')
              .set('Authorization', token)
              .send({
                pin
              })
              .then((loginRes) => {
                token = loginRes.body.token; //eslint-disable-line
                done();
              });
          })
          .catch(err => {
            console.error(err);
          });
      }).catch(err => {
        console.error(err);
      });
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  // Valid
  it('[Auth] PUT: Works when the user is logged in', async () => {
    const res = await request(server)
      .put(`/api/employees/update/${pin}`)
      .set('Authorization', token)
      .send({
        oldPassword: 'password',
        newPassword: 'newPassword'
      });

    expect(res.status).toBe(200);
  });

  // Invalid
  it('[No Auth] PUT: Won\'t work if the user isn\'t logged in', async () => {
    const res = await request(server)
      .put('/api/employees/update/0000')
      .set('Authorization', token)
      .send({
        oldPassword: 'password',
        newPassword: 'newPassword'
      });

    expect(res.status).toBe(401);
  });

  it('[No Auth] PUT: Won\'t work if there is no token', async () => {
    const res = await request(server)
      .put(`/api/employees/update/${pin}`)
      .send({
        oldPassword: 'password',
        newPassword: 'newPassword'
      });

    expect(res.status).toBe(401);
  });
});
