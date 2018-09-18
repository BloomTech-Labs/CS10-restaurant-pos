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
      res.status(400).json({ message: 'Something went wrong!', err });
    });
});

// @route   GET api/orders/all
// @desc    View all orders
// @access  Private
router.get('/all', (req, res) => {
  Order.find({ restaurant: res.user.restaurant })
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Something went wrong!', err });
    });
});

// @route   GET api/orders/:id
// @desc    Get an order by id
// @access  Private
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Order.findOne({ _id: id, restaurant: req.user.restaurant })
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .then(order => {
      if (!order) {
        res
          .status(404)
          .json({ message: 'No order with the specified ID exists.' });
      }
      res.status(200).json({ order });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
