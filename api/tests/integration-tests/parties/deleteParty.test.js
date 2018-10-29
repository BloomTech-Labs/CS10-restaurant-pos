const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let tableId;
let partyId;

// jest.setTimeout(100000);

// First a table must be created in order to delete a party
describe('deleteParty', () => {
  beforeAll((done) => {
    // register the admin
    loginAdmin(server)
      .then((loginRes) => {
        token = loginRes;

        // First create an order in the db
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
            // Assigns the _id of the new table to tableId
            tableId = tableRes.body.table._id;

            // Create a party
            request(server)
              .post('/api/party/add')
              .set('Authorization', `${token}`)
              .send({ tables: [tableId] })
              .then(addedParty => {
                // Store the partys ID
                partyId = addedParty.body.party._id;
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
      .catch(err => {
        console.error(err);
      });
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  // [Authorized] deletes a party
  it('[Auth] DELETE: deletes a party from the DB', async () => {
    const res = await request(server)
      .delete(`/api/party/delete/${partyId}`)
      .set('Authorization', `${token}`);

    expect(res.status).toBe(200);
  });

  // [Not Authorized] deletes a party
  it('[No Auth] DELETE: fails to delete a party from the DB', async () => {
    const res = await request(server)
      .delete(`/api/party/delete/${partyId}`);

    expect(res.status).toBe(401);
  });
});
