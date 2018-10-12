const jwt = require('jsonwebtoken');
const nodeFetch = require('node-fetch');

const verifyFields = require('../../validation/verifyFields');
const Restaurant = require('../../models/Restaurant');
const Employee = require('../../models/Employee');
const keys = require('../../../config/keys');

// @route   POST api/restaurants/register
// @desc    Registers a new restaurant under the current admin account
// @access  Private
const registerRestaurant = (req, res) => {
  // requires admin id, name, location

  const restaurantInfo = req.body;
  restaurantInfo.admin = req.user._id;

  // verify the required fields
  verifyFields(['name', 'location'], req.body, res);

  const encodedHeader = Buffer.from(`${keys.avalaraAccountId}:${keys.avalaraLicense}`).toString('base64');
  nodeFetch(
    `https://rest.avatax.com/api/v2/taxrates/bypostalcode?country=US&postalCode=${
      req.body.location
    }`,
    {
      headers: { Authorization: `Basic ${encodedHeader}` }
    }
  )
    .then((response) => response.json())
    .then((json) => {
      const newRestaurant = new Restaurant({ ...req.body, taxRate: json.totalRate });

      newRestaurant
        .save()
        .then((savedRestaurant) => {
          const adminId = req.user._id;
          console.log('testing:', savedRestaurant.taxRate);
          // add the restaurant id to the admin's account
          Employee.findOneAndUpdate({ _id: adminId }, { restaurant: savedRestaurant._id }).catch(
            (err) => {
              res.status(500).json({ err, msg: 'There was an error updating the account.' });
            }
          );

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
          const token = `Bearer ${jwt.sign(payload, keys.secretOrKey, { expiresIn: '24h' })}`;

          // send back the token with a success message
          res.status(201).json({ token, msg: 'Successfully created' });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ err, msg: 'There was an error saving the restaurant in the database.' });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'There was an error fetching the tax rate for your location.' });
    });
};

module.exports = { registerRestaurant };
