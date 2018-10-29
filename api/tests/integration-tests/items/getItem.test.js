const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let itemId;

// jest.setTimeout(100000);

describe('getItem', () => {
  beforeAll((done) => {
    // register the admin
    loginAdmin(server)
      .then((loginRes) => {
        token = loginRes;

        // First create an item in the db
        request(server)
          .post('/api/items/add')
          .set('Authorization', `${token}`)
          .send(
            {
              name: 'Cheese Wontons',
              price: 4.99,
              description: 'Yum',
            }
          )
          .then(itemRes => {
            // Assigns the _id of the new item to itemId
            itemId = itemRes.body.items[0]._id;
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

  // [Authorized] Gets an item from the DB
  it('[Auth] GET: Gets an item from the DB', async () => {
    const res = await request(server)
      .get(`/api/items/${itemId}`)
      .set('Authorization', `${token}`);

    expect(res.body.item.name).toEqual('Cheese Wontons');
    expect(res.status).toBe(200);
  });

  // [Not Authorized] Fails to get an item from the DB
  it('[No Auth] GET: Fails to get an item from the DB', async () => {
    const res = await request(server)
      .get(`/api/items/${itemId}`);

    expect(res.status).toBe(401);
  });
});
