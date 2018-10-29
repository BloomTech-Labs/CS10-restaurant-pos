const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;

// jest.setTimeout(100000);

describe('addItem', () => {
  beforeAll((done) => {
    // register the admin
    loginAdmin(server)
      .then((loginRes) => {
        token = loginRes;
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  // [Authorized] Adds an item to the DB
  it('POST: Adds a new item to the DB', async () => {
    const res = await request(server)
      .post('/api/items/add')
      .set('Authorization', `${token}`)
      .send({
        name: 'Cheese Wontons',
        price: 4.99
      });

    expect(res.status).toBe(201);
  });

  // [Not Authorized] Fails at adding an item to the DB
  it('[No Auth] POST: Fails adding a new item to the DB', async () => {
    const res = await request(server)
      .post('/api/items/add')
      .send({
        name: 'Cheese Wontons',
        price: 4.99
      });

    expect(res.status).toBe(401);
  });
});
