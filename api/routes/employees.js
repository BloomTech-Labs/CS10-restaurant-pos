const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');
const Employee = require('../models/Employee');
// verifyFields verifies that all required fields are provided
const verifyFields = require('../validation/verifyFields');
// Verify Roles for Authentication
const verifyRole = require('../validation/verifyRole');

const router = express.Router();

// @route   GET api/employees/test
// @desc    Tests employees' route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Employee Routes Work' }));

// @route   POST api/employees/admin/register
// @desc    Adds an administrator to the DB
// @access  Public
router.post('/admin/register', (req, res) => {
  const { name, pass, email } = req.body;

  // Validate Fields
  verifyFields(['name', 'pass'], req.body, res);

  // Create an initial PIN
  const pin = '0000';
  const role = {
    admin: true
  };

  // Create a new administrator
  const newAdministrator = new Employee({
    name,
    password: pass,
    email,
    pin,
    role
  });

  // Save the new administrator
  newAdministrator
    .save()
    .then((adminInfo) => {
      res.status(200).json({ pin: adminInfo.pin });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'Error saving the administrator to the DB.'
      });
    });
});

// @route   POST api/employees/add
// @desc    Adds a new user to the DB
// @access  Public
router.post('/register', (req, res) => {
  const {
    pass: password, role, name
  } = req.body;
  // Validate Fields
  verifyFields(['name', 'pass'], req.body, res);

  let restaurant;

  try {
    // Check to see if token exists
    if (!req.headers.authorization) {
      return res.status(401).json({ msg: 'You are not authorized to do this.' });
    }
    const currentUser = jwt.verify(req.headers.authorization.slice(7), keys.secretOrKey);

    // eslint-disable-next-line
    restaurant = currentUser.restaurant;

    // Verify roles
    verifyRole(currentUser, res);
  } catch (err) {
    return res.status(500).json({ err, msg: 'Error verifying the token.' });
  }

  // TODO: Remove auto generated pins
  let pin = '';

  for (let i = 0; i < 4; i++) {
    pin += Math.floor(Math.random() * 10);
  }

  // Create a new employee
  const newEmployee = new Employee({
    name,
    password,
    role,
    pin,
    restaurant
  });

  newEmployee
    .save()
    .then((employeeInfo) => {
      // Send the employees pin number
      res.status(201).json(employeeInfo.pin);
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error saving the employee to the database.' });
    });
});

// @route   POST api/employees/login
// @desc    Lets a user login
// @access  Public
router.post('/login', (req, res) => {
  // Pull off the pin and pass from the request
  const { pin, pass } = req.body;
  // Token contains the restaurant source via logged in admin
  const token = jwt.verify(req.headers.authorization.slice(7), keys.secretOrKey);

  verifyFields(['pin'], req.body, res);

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
          role: {
            admin: employee.role.admin,
            manager: employee.role.manager
          },
          restaurant: employee.restaurant
        };

        // Sign the token
        const newToken = `Bearer ${jwt.sign(payload, keys.secretOrKey)}`;

        // Send in the token
        res.status(200).json({ token: newToken });
      } else {
        res.status(401).json({ msg: 'Invalid PIN or password.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
});

// @route   POST api/employees/admin/login
// @desc    Lets an admin login
// @access  Public
router.post('/admin/login', (req, res) => {
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
});

// @route   PUT api/employees/update/:pin
// @desc    Allow a user to change their password
// @access  Private
router.put('/update/:pin', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Pull off the pin, oldPassword, and newPassword from the request
  const { oldPassword, newPassword } = req.body;
  const { pin } = req.params;
  const { user } = req;

  // Validate a users role and pin
  if (!user.role.admin && !user.role.manager && user.pin !== pin) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  verifyFields(['oldPassword', 'newPassword'], req.body, res);

  // Locate the employee
  Employee.findOne({ pin, restaurant: req.user.restaurant })
    .then((employee) => {
      // if the employee doesn't exist send an error
      if (!employee) {
        return res.status(401).json({ msg: 'Invalid PIN or password.' });
      }

      // Check the password on the model
      employee
        .checkPassword(oldPassword)
        .then((verified) => {
          // if the password is correct update the employee's password
          if (verified) {
            employee.password = newPassword;

            employee
              .save()
              .then(() => {
                res.status(200).json({ msg: 'Successfully changed the password.' });
              })
              .catch((err) => {
                res.status(500).json({ err, msg: 'Error communicating with the database.' });
              });
          } else {
            res.status(401).json({ msg: 'Invalid PIN or password.' });
          }
        })
        .catch((err) => {
          res.status(401).json({ err, msg: 'Error checking the password.' });
        });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
});

router.get('/logout', (req, res) => {
  // pull the restaurant ID off the token in the headers
  const { restaurant } = jwt.verify(req.headers.authorization.slice(7), keys.secretOrKey);

  // remove all user information from the payload
  const payload = {
    restaurant,
    id: null,
    pin: null,
    role: {
      admin: null,
      manager: null
    }
  };

  // sign a new token with the new payload
  const token = `Bearer ${jwt.sign(payload, keys.secretOrKey)}`;

  // send back the token
  res.status(200).json({ token });
});

// @route   GET server/employees/current
// @desc    Return current employee
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    pin: req.user.pin,
    role: req.user.role
  });
});
module.exports = router;
