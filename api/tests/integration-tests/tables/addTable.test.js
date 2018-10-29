const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;

// jest.setTimeout(100000);

describe('addTable', () => {
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

  // [Authorized] Adds a table to the DB
  it('[Auth] POST: Adds a new table to the DB', async () => {
    const res = await request(server)
      .post('/api/tables/add')
      .set('Authorization', `${token}`)
      .send(
        {
          x: 1,
          y: 1,
          number: 1
        }
      );

    expect(res.status).toBe(201);
  });

  // [Not Authorized] Should fail to add a table to the DB
  it('[No Auth] POST: Fails adding a new table to the DB', async () => {
    const res = await request(server)
      .post('/api/tables/add')
      .send(
        {
          x: 1,
          y: 1,
          number: 1
        }
      );

    expect(res.status).toBe(401);
  });
});
