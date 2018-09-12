const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require Order Model
const Order = require('../models/Order');

// @route   POST api/orders/test
// @desc    Test the orders routes
// @access  Public
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Orders Routes Work!' });
});

module.exports = router;
