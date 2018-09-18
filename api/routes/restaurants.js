const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const verifyFields = require('../validation/verifyFields');
const Restaurant = require('../models/Restaurant');
const keys = require('../../config/keys');

// @route   POST api/restaurants/register
// @desc    Registers a new restaurant under the current admin account
// @access  Private
router.post('/register', (req, res) => {
  // requires admin id, name, location, billing.address

  // verify the required fields
  verifyFields(['admin', 'name', 'location', 'billing'], req.body, res);

  const newRestaurant = new Restaurant(req.body);

  newRestaurant.save()
    .then((savedRestaurant) => {
      const payload = {
        id: null,
        pin: null,
        role: {
          admin: null,
          manager: null
        },
        restaurant: savedRestaurant._id
      };

      // sign a new token with the restaurant id
      const token = `Bearer ${jwt.sign(payload, keys.secretOrKey)}`;

      // send back the token with a success message
      res.status(201).json({ token, msg: 'Successfully created' });
    }).catch(err => {
      res.status(500).json({ err, msg: 'There was an error saving the restaurant in the database.' });
    });
});

module.exports = router;
