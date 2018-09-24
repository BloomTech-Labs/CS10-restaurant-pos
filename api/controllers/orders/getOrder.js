// Require Order Model
const Order = require('../../models/Order');


// @route   GET api/orders/:id
// @desc    Get an order by id
// @access  Private
const getOrder = (req, res) => {
  const { id } = req.params;

  Order.findOne({ _id: id })
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .then((order) => {
      if (!order) {
        res
          .status(404)
          .json({ message: 'No order with the specified ID exists.' });
      }
      res.status(200).json({ order });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'Error retrieving the order from the database.' });
    });
};

module.exports = { getOrder };
