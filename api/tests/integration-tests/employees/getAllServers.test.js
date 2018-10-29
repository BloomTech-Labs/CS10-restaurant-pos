const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let employeePin;
let managerPin;

// jest.setTimeout(100000);

describe('getAllServers', () => {
  beforeAll((done) => {
    loginAdmin(server)
      .then((resToken) => {
        token = resToken;
        request(server)
          .post('/api/employees/register')
          .set('Authorization', token)
          .send({
            name: 'Fred Fredson',
            email: 'fred@fredson.biz',
            pass: 'password',
          })
          .then((pinRes) => {
            employeePin = pinRes.body.pin;
            request(server)
              .post('/api/employees/register')
              .set('Authorization', token)
              .send({
                name: 'Andy Anderson',
                email: 'andy@anderson.biz',
                pass: 'password',
                role: {
                  manager: true,
                },
              })
              .then((mgrPinRes) => {
                managerPin = mgrPinRes.body.pin;
                done();
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  // [Auth] Response should have an array of three employees when logged in as admin
  it('[Auth] GET: Works when logged in as admin', async () => {
    const res = await request(server)
      .get('/api/employees/all')
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('employees');
    expect(res.body.employees.length).toBe(3);
  });

  // [Auth] Response should have an array of one employee when logged in as a manager
  it('[Auth] GET: Works when logged in as manager', async () => {
    const res = await request(server)
      .post('/api/employees/login')
      .set('Authorization', token)
      .send({
        pin: managerPin,
        pass: 'password'
      })
      .then(response => (
        request(server)
          .get('/api/employees/all')
          .set('Authorization', response.body.token)
      ));

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('employees');
    expect(res.body.employees.length).toBe(1);
  });

  // [Not Auth] Response should not have an array of employees when logged in as a server
  it('[Not Auth] GET: Fails when logged in as a server', async () => {
    const res = await request(server)
      .post('/api/employees/login')
      .set('Authorization', token)
      .send({
        pin: employeePin
      })
      .then(response => (
        request(server)
          .get('/api/employees/all')
          .set('Authorization', response.body.token)
      ));

    expect(res.status).toBe(401);
    expect(res.body).not.toHaveProperty('employees');
  });

  // [Not Auth] Should fail with no auth token
  it('[Not Auth] GET: Should fail with no authorization', async () => {
    const res = await request(server)
      .get('/api/employees/all');

    expect(res.status).toBe(401);
    expect(res.body).not.toHaveProperty('employees');
  });
});
