const {
  registerRestaurant
} = require('../controllers/restaurants');

module.exports = (server, validation) => {
  server.route('/api/restaurants/register').post(validation, registerRestaurant);
};
