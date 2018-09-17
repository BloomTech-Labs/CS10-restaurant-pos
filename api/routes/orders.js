const express = require('express');

const router = express.Router();

// Require Order Model
const Order = require('../models/Order');
// verifies the fields
const verifyFields = require('../validation/verifyFields');

// @route   POST api/orders/test
// @desc    Test the orders routes
// @access  Private
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Orders Routes Work!' });
});

// @route   POST api/orders/add
// @desc    Create a new order
// @access  Private
router.post('/add', (req, res) => {
  // Verify that all required fields are provided, sends error response if not
  verifyFields(['party', 'server', 'food'], req.body, res);

  // Create the new order
  const newOrder = new Order(req.body);

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
});

// @route   GET api/orders/all
// @desc    View all orders
// @access  Private
router.get('/all', (req, res) => {
  Order.find({})
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
});

// @route   GET api/orders/:id
// @desc    Get an order by id
// @access  Private
router.get('/:id', (req, res) => {
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
});

router.put('/update/:id', (req, res) => {
  const { id } = req.params;

  Order.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((updatedOrder) => {
      if (!updatedOrder) {
        res
          .status(404)
          .json({ message: 'No order with the specified ID exists.' });
      }
      res.status(200).json(updatedOrder);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'Error updating the order in the database.' });
    });
});

module.exports = router;
