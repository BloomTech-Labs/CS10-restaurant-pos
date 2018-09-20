const {
  subscribe,
  checkout
} = require('../controllers/stripe');

module.exports = (server, validation) => {
  server.route('/api/subscribe').post(validation, subscribe);
  server.route('/api/checkout').post(validation, checkout);
};
