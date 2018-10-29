const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;
let id;

// jest.setTimeout(100000);

describe('deleteItem', () => {
  beforeAll((done) => {
    // register the admin
    loginAdmin(server)
      .then((loginRes) => {
        token = loginRes;
        request(server)
          .post('/api/items/add')
          .set('Authorization', token)
          .send({
            name: 'Fries',
            description: 'Salty potato sticks',
            price: '3.99'
          })
          .then((res) => {
            id = res.body.items[0]._id;
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

  // [No Auth] Adds an item to the DB
  it('[No Auth] DELETE: Does not delete the item from the DB without authorization', async () => {
    const res = await request(server)
      .delete(`/api/items/delete/${id}`);

    expect(res.status).toBe(401);
    expect(res.body).not.toHaveProperty('removedItem');
  });

  // [Auth] Deletes an item from the DB
  it('[Auth] DELETE: Deletes the item from the DB with authorization', async () => {
    const res = await request(server)
      .delete(`/api/items/delete/${id}`)
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('removedItem');
    expect(res.body.removedItem.name).toBe('Fries');
  });
});
