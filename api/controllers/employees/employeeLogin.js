const jwt = require('jsonwebtoken');

const keys = require('../../../config/keys');
// verifyFields verifies that all required fields are provided
const verifyFields = require('../../validation/verifyFields');
const Employee = require('../../models/Employee');

// @route   POST api/employees/login
// @desc    Lets a user login
// @access  Public
const employeeLogin = (req, res) => {
  // Pull off the pin and pass from the request
  const { pin, pass } = req.body;
  // Token contains the restaurant source via logged in admin
  const token = jwt.verify(req.headers.authorization.slice(7), keys.secretOrKey);

  // Validate Fields
  const missingFields = verifyFields(['pin'], req.body, res);

  if (missingFields.length > 0) {
    return res.status(422).json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

  // Find the employee in the DB
  Employee.findOne({ pin, restaurant: token.restaurant })
    .then(async (employee) => {
      if (!employee) {
        return res.status(401).json({ msg: 'No user found.' });
      }

      let verified = true;

      if (employee.role.admin || employee.role.manager) {
        try {
          verified = await employee.checkPassword(pass);
        } catch (err) {
          res.status(500).json({ err, msg: 'There was an error checking the password.' });
        }
      }

      if (verified) {
        // Create a payload for the logged in user
        const payload = {
          id: employee.id,
          pin: employee.pin,
          name: employee.name,
          email: employee.email,
          images: employee.images,
          role: {
            admin: employee.role.admin,
            manager: employee.role.manager
          },
          restaurant: employee.restaurant,
          themeColor: employee.themeColor,
          membership: token.membership
        };

        // Sign the token
        const newToken = `Bearer ${jwt.sign(payload, keys.secretOrKey, { expiresIn: '24h' })}`;

        // Send in the token
        res.status(200).json({ token: newToken });
      } else {
        res.status(401).json({ msg: 'Invalid PIN or password.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
};

module.exports = { employeeLogin };
