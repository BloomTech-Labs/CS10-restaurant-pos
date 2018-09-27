const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let orderId;

jest.setTimeout(30000);

describe('updateOrder', () => {
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

  // A test order to use as an update
  const testOrder = {
    party: '5b993879366d2671bcba0e02',
    server: '5b993879366d2671bcba0e02',
    food: [
      '5b956483ed2e4d86346d6c82',
      '5b956483ed2e4d86346d6c82',
      '5b956483ed2e4d86346d6c82',
    ],
  };

  // [Authorized] Updates an order
  it('[Auth] PUT: Updates an order in the DB', async () => {
    const res = await request(server)
      .put(`/api/orders/update/${orderId}`)
      .set('Authorization', `${token}`)
      .send(testOrder);

    expect(res.status).toBe(200);
    expect(res.body.updatedOrder.food.length).toEqual(3);
  });
});
