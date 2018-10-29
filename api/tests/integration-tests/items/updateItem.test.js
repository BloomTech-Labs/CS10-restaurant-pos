const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let itemId;

// jest.setTimeout(100000);

describe('updateItem', () => {
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

  // [Authorized] Updates an item in the DB
  it('[Auth] PUT: Updates an item in the DB', async () => {
    const res = await request(server)
      .put(`/api/items/update/${itemId}`)
      .set('Authorization', `${token}`)
      .send(
        {
          price: 7.99,
        }
      );

    expect(res.body.updatedItem.price).toEqual(7.99);
    expect(res.status).toBe(200);
  });

  // [Not Authorized] Fails to update an item in the DB
  it('[No Auth] PUT: Fails to update an item in the DB', async () => {
    const res = await request(server)
      .put(`/api/items/update/${itemId}`);

    expect(res.status).toBe(401);
  });
});
