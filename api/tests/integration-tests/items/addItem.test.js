const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');

let token;

describe('addItem', () => {
  beforeAll((done) => {
    request(server)
      .post('/api/employees/admin/register')
      .send({
        name: 'administrator',
        email: 'admin@admin.com',
        pass: 'password'
      })
      .then(() => {
        request(server)
          .post('/api/employees/admin/login')
          .send({
            email: 'admin@admin.com',
            pass: 'password'
          })
          .then((res) => {
            token = res.body.token; // eslint-disable-line 
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
              .then(() => {
                request(server)
                  .post('/api/employees/admin/login')
                  .send({
                    email: 'admin@admin.com',
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
