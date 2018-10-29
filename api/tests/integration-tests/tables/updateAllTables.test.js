const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let tableId;

// jest.setTimeout(100000);

describe('updateAllTables', () => {
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
          .then(tableRes => {
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

  // [Authorized] Updates all the tables
  it('[Auth] POST: Updates all tables in the DB', async () => {
    const res = await request(server)
      .post('/api/tables/update')
      .set('Authorization', `${token}`)
      .send(
        {
          tables: [
            {
              _id: tableId,
              x: 2,
              y: 2,
              number: 1
            }
          ]
        }
      );

    expect(res.body.updatedTables[0].x).toEqual(2);
    expect(res.status).toBe(200);
  });

  // [Not Authorized] Fails to update all the tables
  it('[No Auth] POST: Fails to update all tables in the DB', async () => {
    const res = await request(server)
      .post('/api/tables/update')
      .send(
        {
          tables: [
            {
              _id: tableId,
              x: 2,
              y: 2,
              number: 1
            }
          ]
        }
      );

    expect(res.status).toBe(401);
  });
});
