const { registerRestaurant } = require('./registerRestaurant');
const { updateRestaurant } = require('./updateRestaurant');
const { getCurrentRestaurantTaxRate } = require('./getCurrentRestaurantTaxRate');

module.exports = {
  registerRestaurant,
  updateRestaurant,
  getCurrentRestaurantTaxRate
};
