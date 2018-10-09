// verifyFields verifies that all required fields are provided
const verifyFields = require('../../validation/verifyFields');
const Employee = require('../../models/Employee');

// @route   PUT api/employees/update/:pin
// @desc    Allow a user to change their password
// @access  Private
const updateEmployee = (req, res) => {
  // Pull off the pin, oldPassword, and newPassword from the request
  const {
    pass, newPass, name, email, themeColor
  } = req.body;

  const { pin } = req.params;
  const { user } = req;

  // Validate a users role and pin
  if (user.pin !== pin) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  // Validate Fields
  const missingFields = verifyFields(['pass'], req.body, res);

  if (missingFields.length > 0) {
    return res.status(422).json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

  // Locate the employee
  Employee.findOne({ pin, restaurant: req.user.restaurant })
    .then((employee) => {
      // if the employee doesn't exist send an error
      if (!employee) {
        return res.status(401).json({ msg: 'Invalid PIN or password.' });
      }

      // Check the password on the model
      employee
        .checkPassword(pass)
        .then((verified) => {
          // if the password is correct update the employee's password
          if (verified) {
            employee.email = email || employee.email;
            employee.name = name || employee.name;
            employee.password = newPass || employee.password;
            if (themeColor) {
              employee.themeColor = themeColor;
            }

            employee
              .save()
              .then(() => {
                Employee.updateMany({ restaurant: req.user.restaurant }, { themeColor })
                  .then(() => {
                    res.status(200).json({ msg: 'Successfully updated the user.' });
                  })
                  .catch((err) => {
                    res.status(500).json({ err, msg: 'Error updating the user in the database.' });
                  });
              })
              .catch((err) => {
                res.status(500).json({ err, msg: 'Error updating the user in the database.' });
              });
          } else {
            res.status(401).json({ msg: 'Invalid credentials.' });
          }
        })
        .catch((err) => {
          res.status(401).json({ err, msg: 'Error checking the password.' });
        });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
};

module.exports = { updateEmployee };
