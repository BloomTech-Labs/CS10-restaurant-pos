const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let tableId;
let partyId;

// jest.setTimeout(100000);

// First a table must be created in order to add a party
describe('updateParty', () => {
  beforeAll((done) => {
    // register the admin
    loginAdmin(server)
      .then((loginRes) => {
        token = loginRes;

        // First create a table in the db
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

  // [Authorized] Updates a party
  it('[Auth] PUT: Updates a party in the DB', async () => {
    const res = await request(server)
      .put(`/api/party/update/${partyId}`)
      .set('Authorization', `${token}`)
      .send({ tables: [tableId, tableId] });

    expect(res.body.updatedParty.tables.length).toEqual(2);
    expect(res.status).toBe(200);
  });

  // [Not Authorized] Fails to update a party
  it('[No Auth] PUT: Fails to update a party in the DB', async () => {
    const res = await request(server)
      .put(`/api/party/update/${partyId}`);

    expect(res.status).toBe(401);
  });
});
