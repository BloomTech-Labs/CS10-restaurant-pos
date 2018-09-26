const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;

describe('getAllOrders', () => {
  beforeAll(async (done) => {
    // register the admin
    await loginAdmin(server)
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
                '5b956483ed2e4d86346d6c82',
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

  // [Authorized] Deletes an order from the DB
  it('[Auth] GET: Gets all orders from the DB', async () => {
    const res = await request(server)
      .get('/api/orders/all')
      .set('Authorization', `${token}`);

    expect(res.status).toBe(200);
  });
});
