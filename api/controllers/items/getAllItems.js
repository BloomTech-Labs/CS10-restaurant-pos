const Item = require('../../models/Item');

// @route   GET api/items/all
// @desc    Retrieves all the food items in the DB
// @access  Private
const getAllItems = (req, res) => {
  Item.find({ restaurant: req.user.restaurant })
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
};

module.exports = { getAllItems };
