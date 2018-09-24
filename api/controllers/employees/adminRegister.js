// verifyFields verifies that all required fields are provided
const verifyFields = require('../../validation/verifyFields');
const Employee = require('../../models/Employee');

// @route   POST api/employees/admin/register
// @desc    Adds an administrator to the DB
// @access  Public
const adminRegister = (req, res) => {
  const { name, pass, email } = req.body;

  // Validate Fields
  const missingFields = verifyFields(['name', 'pass'], req.body, res);

  if (missingFields.length > 0) {
    return res.status(422).json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

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
};

module.exports = { adminRegister };
