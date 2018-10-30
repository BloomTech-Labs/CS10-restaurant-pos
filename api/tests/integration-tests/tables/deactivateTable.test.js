const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let tableId;

// jest.setTimeout(100000);

describe('deactivateTable', () => {
  beforeAll((done) => {
    // register the admin
    loginAdmin(server)
      .then((loginRes) => {
        token = loginRes;

        // Add a table to the DB
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

            // Create a party and set the table status to active
            request(server)
              .post('/api/party/add')
              .set('Authorization', `${token}`)
              .send({ tables: [tableId] })
              .then(() => done())
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

  // [Authorized] Deactivates a table
  it('[Auth] PUT: Deactivates a table in the DB', async () => {
    const res = await request(server)
      .put(`/api/tables/deactivate/${tableId}`)
      .set('Authorization', `${token}`);

    expect(res.status).toBe(200);
  });

  // [Not Authorized] Deactivates a table
  it('[No Auth] PUT: Fails to deactivate a table in the DB', async () => {
    const res = await request(server)
      .put(`/api/tables/deactivate/${tableId}`);

    expect(res.status).toBe(401);
  });
});
