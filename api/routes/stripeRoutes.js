const {
  subscribe,
  checkout,
  cancelSubscription,
  updateSubscription
} = require('../controllers/stripe');

module.exports = (server, validation) => {
  server.route('/api/subscribe').post(validation, subscribe);
  server.route('/api/checkout').post(validation, checkout);
  server.route('/api/cancel').get(validation, cancelSubscription);
  server.route('/api/update').get(validation, updateSubscription);
};
