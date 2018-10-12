const Restaurant = require('../../models/Restaurant');

// @route   PUT api/restaurants/update/:id
// @desc    Updates the food item in the database
// @access  Private
const updateRestaurant = (req, res) => {
  const { id } = req.params;
  const restaurantToUpdate = req.body;

  // Verify that the current user is an admin
  if (!req.user.role.admin) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  // updates the item and sends back the updated document
  Restaurant.findOneAndUpdate({ _id: id }, restaurantToUpdate, { new: true })
    .then((updatedRestaurant) => {
      res.status(200).json({ updatedRestaurant });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
};

module.exports = { updateRestaurant };
