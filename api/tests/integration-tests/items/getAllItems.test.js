const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../../../../server');
const { loginAdmin } = require('../../helpers/loginAdmin');

let token;

// jest.setTimeout(100000);

describe('getAllItems', () => {
  beforeAll((done) => {
    loginAdmin(server)
      .then((resToken) => {
        token = resToken;
        request(server)
          .post('/api/items/add')
          .set('Authorization', token)
          .send({
            name: 'Fries',
            description: 'Salty potato sticks',
            price: 4.99,
          })
          .then(() => {
            request(server)
              .post('/api/items/add')
              .set('Authorization', token)
              .send({
                name: 'Ice cream',
                description: 'Cold sweet thing',
                price: 5.33,
              })
              .then(() => {
                done();
              })
              .catch(err => {
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

  // [Authorized] Should return all the items
  it('[Auth] GET: Works with authorization', async () => {
    const res = await request(server)
      .get('/api/items/all')
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body.items.length).toBe(2);
  });

  // [Auth] Response should not contain any items if not authorized
  it('[No Auth] GET: Does not work without authorization', async () => {
    const res = await request(server).get('/api/items/all');

    expect(res.status).toBe(401);
    expect(res.body).not.toHaveProperty('items');
  });
});
