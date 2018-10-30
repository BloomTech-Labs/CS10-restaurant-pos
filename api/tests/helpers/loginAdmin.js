const request = require('supertest');

let token;

const loginAdmin = (server) => (
  // implicitly return the result of this request
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
          // create restaurant
          return request(server)
            .post('/api/restaurants/register')
            .set('Authorization', `${token}`)
            .send({
              name: 'Testaurant',
              location: '28711',
            })
            .then((restaurantRes) => {
              // set new token with restaurant info
              token = restaurantRes.body.token; // eslint-disable-line
              // login admin as employee
              return request(server)
                .post('/api/employees/login')
                .set('Authorization', `${token}`)
                .send({
                  pin: '0000',
                  pass: 'password',
                })
                .then((loginRes) => loginRes.body.token);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        })
    ))
    .catch((err) => {
      console.error(err);
    })
);

module.exports = { loginAdmin };
