const Employee = require('../../models/Employee');
// verifyRole returns true if the user is an admin or manager
const verifyRole = require('../../validation/verifyRole');
// verifyFields verifies that all required fields are provided
const verifyFields = require('../../validation/verifyFields');

// @route   PUT api/employees/promote/:id
// @desc    Allow a manager or admin to promote an employee
// @access  Private
const changeRole = (req, res) => {
  // Pull role object off of the body
  const { role } = req.body;

  console.log(req.params.id);

  // verify that all required fields are provided
  const missingFields = verifyFields(['role'], req.body);
  if (missingFields.length > 0) {
    return res.status(422).json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

  // verify that the current user is authorized to make the changes
  if (!verifyRole(req.user)) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }
  // Locate the employee
  Employee.findOneAndUpdate({ _id: req.params.id }, { role })
    .then((employee) => {
      // if the employee doesn't exist send an error
      if (!employee) {
        return res.status(401).json({ msg: 'Invalid employee ID.' });
      }
      return res.status(200).json({ msg: 'Employee successfully updated.' });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
};

module.exports = { changeRole };
