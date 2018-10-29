const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;

// jest.setTimeout(100000);

describe('getAllTables', () => {
  beforeAll((done) => {
    // register the admin
    loginAdmin(server)
      .then((loginRes) => {
        token = loginRes;

        request(server)
          .post('/api/tables/add')
          .set('Authorization', `${token}`)
          .send(
            {
              x: 1,
              y: 1,
              number: 1
            }
          )
          .then(() => done())
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

  // [Authorized] Gets all tables
  it('[Auth] GET: Gets all tables in the DB', async () => {
    const res = await request(server)
      .get('/api/tables/all')
      .set('Authorization', `${token}`);

    expect(res.body.tables.length).toEqual(1);
    expect(res.status).toBe(200);
  });

  // [Not Authorized] Fails to get all tables
  it('[No Auth] GET: Fails get all tables in the DB', async () => {
    const res = await request(server)
      .get('/api/tables/all');

    expect(res.status).toBe(401);
  });
});
