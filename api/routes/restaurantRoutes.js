const {
  registerRestaurant,
  updateRestaurant,
  getCurrentRestaurantTaxRate
} = require('../controllers/restaurants');

module.exports = (server, validation) => {
  server.route('/api/restaurants/register').post(validation, registerRestaurant);
  server.route('/api/restaurants/update/:id').put(validation, updateRestaurant);
  server.route('/api/restaurants/taxrate').get(validation, getCurrentRestaurantTaxRate);
};
