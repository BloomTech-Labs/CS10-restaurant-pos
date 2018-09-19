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

// @route   POST api/employees/add
// @desc    Adds a new user to the DB
// @access  Public
router.post('/register', (req, res) => {
  const {
    pass: password, role, name, administrator
  } = req.body;
  // Validate Fields
  verifyFields(['name', 'pass'], req.body, res);

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
    administrator
  });

  // Check if the DB is empty or not
  Employee.find({})
    .then((employees) => {
      // make first employee admin by default
      if (employees.length === 0) {
        newEmployee.role.admin = true;
      } else {
        // if there is at least one employee in the database, check if current user has
        // permissions to add new server
        try {
          // Check to see if token exists
          if (!req.headers.authorization) {
            return res.status(401).json({ msg: 'You are not authorized to do this.' });
          }
          const currentUser = jwt.verify(req.headers.authorization.slice(7), keys.secretOrKey);

          // Verify roles
          verifyRole(currentUser, res);
        } catch (err) {
          return res.status(500).json({ err, msg: 'Error verifying the token.' });
        }
      }

      newEmployee
        .save()
        .then((employeeInfo) => {
          res.status(201).json({ pin: employeeInfo.pin });
        })
        .catch((err) => {
          res.status(500).json({ err, msg: 'Error saving the employee to the database.' });
        });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
});

// @route   POST api/employees/login
// @desc    Lets a user login
// @access  Public
router.post('/login', (req, res) => {
  // Pull off the pin and pass from the request
  const { pin, pass } = req.body;

  verifyFields(['pin', 'pass'], req.body, res);

  // Find the employee in the DB
  Employee.findOne({ pin })
    .then((employee) => {
      if (!employee) {
        return res.status(401).json({ msg: 'Invalid PIN or password.' });
      }

      // Check the password on the model
      employee
        .checkPassword(pass)
        .then((verified) => {
          if (verified) {
            // Create a payload
            const payload = {
              id: employee.id,
              pin: employee.pin,
              role: {
                admin: employee.role.admin,
                manager: employee.role.manager
              },
              administrator: employee.administrator
            };

            // Sign the token
            jwt.sign(payload, keys.secretOrKey, { expiresIn: '1d' }, (err, token) => {
              if (err) {
                res.status(400).json({ err, msg: 'Error signing the token.' });
              }

              res.status(200).json({ token: `Bearer ${token}` });
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
  Employee.findOne({ pin })
    .then((employee) => {
      if (!employee) {
        return res.status(401).json({ msg: 'Invalid PIN or password.' });
      }

      // Check the password on the model
      employee
        .checkPassword(oldPassword)
        .then((verified) => {
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
