const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let orderId;

// jest.setTimeout(100000);

describe('getOrder', () => {
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
          .then(orderRes => {
            // Assigns the _id of the new order to orderId
            orderId = orderRes.body.order._id;
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
  it('[Auth] GET: Gets an order from the DB', async () => {
    const res = await request(server)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `${token}`);

    expect(res.status).toBe(200);
  });

  // [Not Authorized] Fails to get an order from the DB
  it('[No Auth] GET: Fails to get an order from the DB', async () => {
    const res = await request(server)
      .get(`/api/orders/${orderId}`);

    expect(res.status).toBe(401);
  });
});
