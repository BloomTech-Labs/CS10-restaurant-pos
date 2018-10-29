const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;

// jest.setTimeout(100000);

describe('getAllOrders', () => {
  beforeAll((done) => {
    // register the admin
    loginAdmin(server)
      .then((loginRes) => {
        token = loginRes;

        // First create an order in the db
        request(server)
          .post('/api/orders/add')
          .set('Authorization', `${token}`)
          .send(
            {
              party: '5b993879366d2671bcba0e02',
              server: '5b993879366d2671bcba0e02',
              food: [
                {
                  id: '5b956483ed2e4d86346d6c82',
                  uniqueId: 'thisIsTheUniqueId'
                }
              ],
            }
          )
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
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  // [Authorized] Gets an order from the DB
  it('[Auth] GET: Gets all orders from the DB', async () => {
    const res = await request(server)
      .get('/api/orders/all')
      .set('Authorization', `${token}`);

    expect(res.status).toBe(200);
  });

  // [Authorized] Returns as an array
  it('[Auth] GET: Returns as type array', async () => {
    const res = await request(server)
      .get('/api/orders/all')
      .set('Authorization', `${token}`);

    expect(Array.isArray(res.body.orders)).toBe(true);
  });

  // [Not Authorized] Fails to get an order from the DB
  it('[No Auth] GET: Fails to get all orders from the DB', async () => {
    const res = await request(server)
      .get('/api/orders/all');

    expect(res.status).toBe(401);
  });
});
