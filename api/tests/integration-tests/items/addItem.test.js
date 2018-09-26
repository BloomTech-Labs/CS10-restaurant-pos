const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');

let token;

describe('addItem', () => {
  beforeAll((done) => {
    // register the admin
    request(server)
      .post('/api/employees/admin/register')
      .send({
        name: 'administrator',
        email: 'admin@admin.com',
        pass: 'password'
      })
      .then(() => {
        // login the admin
        request(server)
          .post('/api/employees/admin/login')
          .send({
            email: 'admin@admin.com',
            pass: 'password'
          })
          .then((res) => {
            // set the token to admin logged in
            token = res.body.token; // eslint-disable-line
            // create restaurant
            request(server)
              .post('/api/restaurants/register')
              .set('Authorization', `${token}`)
              .send({
                name: 'Testaurant',
                location: 'supertest',
                billing: {
                  address: 'null'
                }
              })
              .then((restaurantRes) => {
              // set new token with restaurant info
                token = restaurantRes.body.token; // eslint-disable-line
                // login admin as employee
                request(server)
                  .post('/api/employees/login')
                  .set('Authorization', `${token}`)
                  .send({
                    pin: '0000',
                    pass: 'password'
                  })
                  .end((err, loginRes) => {
                    token = loginRes.body.token; // eslint-disable-line
                    done();
                  });
              })
              .catch((err) => {
                console.error(err);
              });
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
