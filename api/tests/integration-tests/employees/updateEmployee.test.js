const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');
const Employee = require('../../../models/Employee');

let employeeToken;
let adminToken;
let pin;

// jest.setTimeout(100000);

describe('updateEmployee', () => {
  beforeAll((done) => {
    loginAdmin(server)
      .then(resToken => {
        adminToken = resToken;
        request(server)
          .post('/api/employees/register')
          .set('Authorization', adminToken)
          .send({
            name: 'Fred Fredson',
            email: 'fred@fredson.biz',
            pass: 'password'
          })
          .then(response => {
            pin = response.body.pin; // eslint-disable-line
            return request(server)
              .post('/api/employees/login')
              .set('Authorization', adminToken)
              .send({
                pin
              })
              .then((loginRes) => {
                employeeToken = loginRes.body.token; //eslint-disable-line
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
      .set('Authorization', employeeToken)
      .send({
        pass: 'password',
        newPass: 'newPassword'
      });

    expect(res.status).toBe(200);
  });

  it('[Auth] PUT: Update email works when the user is logged in', async () => {
    const res = await request(server)
      .put('/api/employees/update/0000')
      .set('Authorization', adminToken)
      .send({
        pass: 'password',
        email: 'newemail@mail.com'
      });

    const userEmail = await Employee.findOne({ pin: '0000' })
      .then(employee => employee.email);

    expect(res.status).toBe(200);
    expect(userEmail).toBe('newemail@mail.com');
  });

  // Invalid
  it('[No Auth] PUT: Won\'t work if the user isn\'t logged in', async () => {
    const res = await request(server)
      .put('/api/employees/update/0000')
      .set('Authorization', employeeToken)
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
