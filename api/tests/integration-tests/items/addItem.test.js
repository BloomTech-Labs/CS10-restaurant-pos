const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;

describe('addItem', () => {
  beforeAll(async (done) => {
    // register the admin
    await loginAdmin(server)
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
});
