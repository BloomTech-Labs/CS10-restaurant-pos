const jwt = require('jsonwebtoken');

const keys = require('../../../config/keys');
// verifyFields verifies that all required fields are provided
const Employee = require('../../models/Employee');
// import field validation function
const verifyFields = require('../../validation/verifyFields');
// Verify Membership
const verifyMembership = require('../../validation/verifyMembership');

// @route   POST api/employees/admin/login
// @desc    Lets an admin login
// @access  Public
const adminLogin = (req, res) => {
  const { email, pass } = req.body;

  // Validate Fields
  const missingFields = verifyFields(['email', 'pass'], req.body, res);

  if (missingFields.length > 0) {
    return res.status(422).json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

  Employee
    .findOne({ email })
    .then(user => {
      // check the provided password against the password in the db
      user.checkPassword(pass)
        .then(async (verified) => {
          // check if password matches
          if (verified) {
            let membership;
            // check the membership status for the restaurant
            try {
              membership = await verifyMembership(user.restaurant);
              if (typeof membership === 'object') throw membership;
            } catch (err) {
              return res.status(500).json(err);
            }

            // add the restaurant and user's id to the payload
            const payload = {
              membership,
              // if a restaurant exists on the user, don't send the id
              id: user.restaurant ? null : user.id,
              pin: null,
              role: {
                admin: null,
                manager: null
              },
              restaurant: user.restaurant
            };

            // sign a new token with the restaurant id
            const token = `Bearer ${jwt.sign(payload, keys.secretOrKey, { expiresIn: '24h' })}`;

            // send back the token
            res.status(200).json({ token });
          } else {
            res.status(401).json({ msg: 'Invalid email or password.' });
          }
        }).catch(err => {
          res.status(401).json({ err, msg: 'Error checking the password.' });
        }); // catch for checkPassword
    })
    .catch(err => {
      res.status(500).json({ err, msg: 'There was an error communicating with the database.' });
    }); // catch for findOne
};

module.exports = { adminLogin };
