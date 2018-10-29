const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;

// jest.setTimeout(100000);

describe('addOrder', () => {
  beforeAll((done) => {
    // register the admin
    loginAdmin(server)
      .then((loginRes) => {
        token = loginRes;
        done();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  // [Authorized] Adds an order to the DB
  it('[Auth] POST: Adds a new order to the DB', async () => {
    const res = await request(server)
      .post('/api/orders/add')
      .set('Authorization', `${token}`)
      .send({
        party: '5b993879366d2671bcba0e02',
        server: '5b993879366d2671bcba0e02',
        food: [
          {
            id: '5b956483ed2e4d86346d6c82',
            uniqueId: 'thisIsTheUniqueId'
          }
        ]
      });

    expect(res.status).toBe(201);
  });

  // [Not Authorized] Adds an order to the DB
  it('[No Auth] POST: Fails adding a new order to the DB', async () => {
    const res = await request(server)
      .post('/api/orders/add')
      .send({
        party: '5b993879366d2671bcba0e02',
        server: '5b993879366d2671bcba0e02',
        food: [
          {
            id: '5b956483ed2e4d86346d6c82',
            uniqueId: 'thisIsTheUniqueId'
          }
        ]
      });

    expect(res.status).toBe(401);
  });
});
