const jwt = require('jsonwebtoken');

const keys = require('../../../config/keys');
// verifyFields verifies that all required fields are provided
const Employee = require('../../models/Employee');


// @route   POST api/employees/admin/login
// @desc    Lets an admin login
// @access  Public
const adminLogin = (req, res) => {
  const { email, pass } = req.body;

  Employee
    .findOne({ email })
    .then(user => {
      // check the provided password against the password in the db
      user.checkPassword(pass)
        .then((verified) => {
          // check if password matches
          if (verified) {
            // add the restaurant and user's id to the payload
            const payload = {
              id: user._id,
              pin: null,
              role: {
                admin: null,
                manager: null
              },
              restaurant: user.restaurant
            };

            // sign a new token with the restaurant id
            const token = `Bearer ${jwt.sign(payload, keys.secretOrKey)}`;

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
