// verifyFields verifies that all required fields are provided
const verifyFields = require('../../validation/verifyFields');
const Employee = require('../../models/Employee');

// @route   PUT api/employees/update/:pin
// @desc    Allow a user to change their password
// @access  Private
const updatePin = (req, res) => {
  // Pull off the pin, oldPassword, and newPassword from the request
  const { oldPassword, newPassword } = req.body;
  const { pin } = req.params;
  const { user } = req;

  // Validate a users role and pin
  if (!user.role.admin && !user.role.manager && user.pin !== pin) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  // Validate Fields
  const missingFields = verifyFields(['oldPassword', 'newPassword'], req.body, res);

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
};

module.exports = { updatePin };
