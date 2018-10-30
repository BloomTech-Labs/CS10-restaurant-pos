const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let tableId;

// jest.setTimeout(100000);

// First a table must be created in order to add a party
describe('addParty', () => {
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
            done();
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

  // [Authorized] Adds a party
  it('[Auth] POST: Adds a party to the DB', async () => {
    const res = await request(server)
      .post('/api/party/add')
      .set('Authorization', `${token}`)
      .send({ tables: [tableId] });

    expect(res.status).toBe(200);
  });

  // [Authorized] Changes a tables active status to true
  it('[Auth] POST: Changes the tables active status to true when added to a party', async () => {
    const res = await request(server)
      .post('/api/party/add')
      .set('Authorization', `${token}`)
      .send({ tables: [tableId] });

    expect(res.body.party.tables[0].active).toEqual(true);
  });
});
