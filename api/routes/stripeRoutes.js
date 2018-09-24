const {
  subscribe,
  checkout,
  cancelSubscription
} = require('../controllers/stripe');
console.log(cancelSubscription);
module.exports = (server, validation) => {
  server.route('/api/subscribe').post(validation, subscribe);
  server.route('/api/checkout').post(validation, checkout);
  server.route('/api/cancel').get(validation, cancelSubscription);
};
