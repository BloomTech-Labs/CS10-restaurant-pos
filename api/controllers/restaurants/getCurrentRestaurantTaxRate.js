
const Restaurant = require('../../models/Restaurant');

// @route   GET api/restaurants/taxrate
// @desc    Returns the taxrate for the current restaurant
// @access  Private
const getCurrentRestaurantTaxRate = (req, res) => {
  // requires admin id, name, location

  const { restaurant } = req.user;

  Restaurant.find(restaurant)
    .then((info) => {
      res.status(200).json({ taxRate: info[0].taxRate });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
};

module.exports = { getCurrentRestaurantTaxRate };
