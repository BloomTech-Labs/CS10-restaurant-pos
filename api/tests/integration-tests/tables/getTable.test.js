const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let tableId;

jest.setTimeout(30000);

describe('getTable', () => {
  beforeAll(async (done) => {
    // register the admin
    await loginAdmin(server)
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
          .then(tableRes => {
            // Store the new tables ID
            tableId = tableRes.body.table._id;
            done();
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

  // [Authorized] Gets a table
  it('[Auth] GET: gets a table stored in the DB', async () => {
    const res = await request(server)
      .get(`/api/tables/${tableId}`)
      .set('Authorization', `${token}`);

    expect(res.status).toBe(200);
  });
});
