
// Require Order Model
const Order = require('../../models/Order');

// @route   PUT api/orders/update/:id
// @desc    Update an order by id
// @access  Private
const updateOrder = (req, res) => {
  const { id } = req.params;

  Order.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((updatedOrder) => {
      if (!updatedOrder) {
        res
          .status(404)
          .json({ message: 'No order with the specified ID exists.' });
      }
      res.status(200).json({ updatedOrder });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'Error updating the order in the database.' });
    });
};

module.exports = { updateOrder };
