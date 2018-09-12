const express = require('express');

const router = express.Router();

// Require Order Model
const Order = require('../models/Order');

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
  const orderData = { ...req.body };

  // Create the new order
  const newOrder = new Order(orderData);

  // Assign Refs
  newOrder
    .save()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Something went wrong!', err });
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
      res.status(400).json({ message: 'Something went wrong!', err });
    });
});

module.exports = router;
