const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let tableId;

// jest.setTimeout(100000);

describe('deleteTable', () => {
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

  // [Authorized] Deactivates a table
  it('[Auth] DELETE: deletes a table in the DB', async () => {
    const res = await request(server)
      .delete(`/api/tables/delete/${tableId}`)
      .set('Authorization', `${token}`);

    expect(res.status).toBe(200);
  });

  // [Not Authorized] Deactivates a table
  it('[No Auth] DELETE: Fails to delete a table in the DB', async () => {
    const res = await request(server)
      .delete(`/api/tables/delete/${tableId}`);

    expect(res.status).toBe(401);
  });
});
