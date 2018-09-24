// Require Order Model
const Order = require('../../models/Order');

// @route   POST api/orders/delete
// @desc    Delete a order
// @access  Private
const deleteOrder = (req, res) => {
  const { id } = req.params;

  Order.findOneAndRemove({ _id: id })
    .then(removedItem => {
      res.status(202).json({
        removedItem,
        msg: 'The order was removed from the database.'
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'Error deleting the order from the database.' });
    });
};

module.exports = { deleteOrder };
