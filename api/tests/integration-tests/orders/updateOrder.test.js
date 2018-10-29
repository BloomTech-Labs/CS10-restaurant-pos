const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let orderId;

// jest.setTimeout(100000);

describe('updateOrder', () => {
  beforeAll((done) => {
    // register the admin
    loginAdmin(server)
      .then((loginRes) => {
        token = loginRes;

        // First create an order in the db
        request(server)
          .post('/api/orders/add')
          .set('Authorization', `${token}`)
          .send({
            party: '5b993879366d2671bcba0e02',
            server: '5b993879366d2671bcba0e02',
            food: [
              {
                id: '5b956483ed2e4d86346d6c82',
                uniqueId: 'thisIsTheUniqueId'
              }
            ]
          })
          .then((orderRes) => {
            // Assigns the _id of the new order to orderId
            orderId = orderRes.body.order._id;
            done();
          })
          .catch((err) => {
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

  // A test order to use as an update
  const testOrder = {
    party: '5b993879366d2671bcba0e02',
    server: '5b993879366d2671bcba0e02',
    food: [
      {
        id: '5b956483ed2e4d86346d6c82',
        uniqueId: 'thisIsTheUniqueId1'
      },
      {
        id: '5b956483ed2e4d86346d6c82',
        uniqueId: 'thisIsTheUniqueId2'
      },
      {
        id: '5b956483ed2e4d86346d6c82',
        uniqueId: 'thisIsTheUniqueId3'
      }
    ]
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

  // [Not Authorized] Fails to update an order without auth
  it('[No Auth] PUT: Fails to update an order in the DB', async () => {
    const res = await request(server)
      .put(`/api/orders/update/${orderId}`)
      .send(testOrder);

    expect(res.status).toBe(401);
  });
});
