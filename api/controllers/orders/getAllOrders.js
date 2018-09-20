// Require Order Model
const Order = require('../../models/Order');

// @route   GET api/orders/all
// @desc    View all orders
// @access  Private
const getAllOrders = (req, res) => {
  Order.find({ restaurant: req.user.restaurant })
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'Error retrieving the orders the database.' });
    });
};

module.exports = { getAllOrders };
