const {
  subscribe
} = require('../controllers/stripe');

module.exports = (server, validation) => {
  server.route('/api/subscriptions/subscribe').post(validation, subscribe);
};
