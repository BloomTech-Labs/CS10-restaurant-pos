const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');

let token;

jest.setTimeout(30000);

describe('registerRestaurant', () => {
  beforeAll((done) => {
    // register the admin
    request(server)
      .post('/api/employees/admin/register')
      .send({
        name: 'administrator',
        email: 'admin@admin.com',
        pass: 'password',
      })
      .then(() => (
        // login the admin
        request(server)
          .post('/api/employees/admin/login')
          .send({
            email: 'admin@admin.com',
            pass: 'password',
          })
          .then((res) => {
            // set the token to admin logged in
            token = res.body.token; // eslint-disable-line
            done();
          })
          .catch((err) => {
            console.error(err);
          })
      ))
      .catch((err) => {
        console.error(err);
      });
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  // [Authorized] Registers a restaurant
  it('[Auth] POST: Registers a restaurant in the DB', async () => {
    const res = await request(server)
      .post('/api/restaurants/register')
      .set('Authorization', `${token}`)
      .send({
        name: 'Testaurant',
        location: 'supertest',
        billing: {
          address: 'null',
        },
      });

    expect(res.status).toBe(201);
  });
});