const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let tableId;

// jest.setTimeout(100000);

// First a table must be created in order to add a party
describe('getAllParties', () => {
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
              .then(() => {
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

  // [Authorized] Gets all the parties
  it('[Auth] GET: Retrieves all parties from the DB', async () => {
    const res = await request(server)
      .get('/api/party/all')
      .set('Authorization', `${token}`);

    expect(res.body.parties[0].tables.length).toEqual(1);
    expect(res.status).toBe(200);
  });

  // [Not Authorized] Gets all the parties
  it('[No Auth] GET: Fails to retrieve all parties from the DB', async () => {
    const res = await request(server)
      .get('/api/party/all');

    expect(res.status).toBe(401);
  });
});
