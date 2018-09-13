const express = require('express');
// const jwt = require('jsonwebtoken');

const stripe = require('../../config/keys').stripeSecretKey;
const Employee = require('../models/Employee');

const router = express.Router();

// @route   GET api/subscriptions/test
// @desc    Tests subscription routes
// @access  Private
router.get('/test', (req, res) => res.json({ msg: 'Subscription Routes Work' }));

// @route   GET api/subscriptions/subscribe
// @desc    Tests subscription routes
// @access  Private
router.post('/subscribe', (req, res) => {
  const { pin, email, stripeToken } = req.body;

  // Create a new customer
  const newCustomer = stripe.customers.create({
    email,
    source: stripeToken
  });

  // Create a new subscription
  const newSubscription = stripe.subscriptions.create({
    customer: newCustomer.id,
    items: [
      {
        plan: 'Monthly'
      }
    ]
  });

  // Compile data to update a user
  const updateAdmin = {
    role: {
      subscription: newSubscription.id,
      membership: true
    }
  };

  // Update the admin info
  Employee.findOneAndUpdate({ pin }, updateAdmin)
    .then((employee) => {
      res.status(200).json(employee);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
