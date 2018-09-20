// Require Order Model
const Order = require('../../models/Order');
// verifies the fields
const verifyFields = require('../../validation/verifyFields');

// @route   POST api/orders/add
// @desc    Create a new order
// @access  Private
const addOrder = (req, res) => {
  const orderData = { ...req.body };
  verifyFields(['party', 'server', 'food'], req.body, res);

  // pull restaurant id from req.user and assign to the new order
  orderData.restaurant = req.user.restaurant;

  // Create the new order
  const newOrder = new Order(orderData);

  // Assign Refs
  newOrder
    .save()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'Error adding the order to the database.' });
    });
};

module.exports = { addOrder };
