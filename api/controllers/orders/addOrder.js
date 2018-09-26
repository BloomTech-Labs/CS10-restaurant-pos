// Require Order Model
const Order = require('../../models/Order');
// verifies the fields
const verifyFields = require('../../validation/verifyFields');

// @route   POST api/orders/add
// @desc    Create a new order
// @access  Private
const addOrder = (req, res) => {
  const orderData = { ...req.body };

  const missingFields = verifyFields(['server', 'party', 'food'], req.body);

  if (missingFields.length > 0) {
    return res.status(422).json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

  // pull restaurant id from req.user and assign to the new order
  orderData.restaurant = req.user.restaurant;

  // Create the new order
  const newOrder = new Order(orderData);

  // Assign Refs
  newOrder
    .save()
    .then((order) => {
      res.status(201).json({ order });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'Error adding the order to the database.' });
    });
};

module.exports = { addOrder };
