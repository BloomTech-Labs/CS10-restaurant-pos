const jwt = require('jsonwebtoken');

const verifyFields = require('../../validation/verifyFields');
const Restaurant = require('../../models/Restaurant');
const Employee = require('../../models/Employee');
const keys = require('../../../config/keys');

// @route   POST api/restaurants/register
// @desc    Registers a new restaurant under the current admin account
// @access  Private
const registerRestaurant = (req, res) => {
  // requires admin id, name, location, billing.address

  const restaurantInfo = req.body;
  restaurantInfo.admin = req.user._id;

  // verify the required fields
  verifyFields(['name', 'location', 'billing'], req.body, res);

  const newRestaurant = new Restaurant(req.body);

  newRestaurant.save()
    .then((savedRestaurant) => {
      const adminId = req.user._id;

      // add the restaurant id to the admin's account
      Employee
        .findOneAndUpdate({ _id: adminId }, { restaurant: savedRestaurant._id })
        .catch(err => {
          res.status(500).json({ err, msg: 'There was an error updating the account.' });
        });

      const payload = {
        id: null,
        pin: null,
        role: {
          admin: null,
          manager: null
        },
        restaurant: savedRestaurant._id,
        membership: savedRestaurant.membership
      };

      // sign a new token with the restaurant id
      const token = `Bearer ${jwt.sign(payload, keys.secretOrKey)}`;

      // send back the token with a success message
      res.status(201).json({ token, msg: 'Successfully created' });
    }).catch(err => {
      res.status(500).json({ err, msg: 'There was an error saving the restaurant in the database.' });
    });
};

module.exports = { registerRestaurant };
