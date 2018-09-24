// Import Table Model
const Table = require('../../models/Table');
const verifyFields = require('../../validation/verifyFields');
const verifyRole = require('../../validation/verifyRole');

// @route   POST api/tables/add
// @desc    Adds a new table to the database
// @access  Private
const addTable = (req, res) => {
  // Verify roles
  if (!verifyRole(req.user)) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  const { x, y, number } = req.body;

  // verifies that all required fields are provided
  const missingFields = verifyFields(['x', 'y', 'number'], req.body);

  if (missingFields.length > 0) {
    return res.status(422).json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

  const newTable = new Table({
    x,
    y,
    number,
    restaurant: req.user.restaurant
  });

  newTable
    .save()
    .then((table) => {
      res.status(201).json({ table });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error saving the table to the database.',
      });
    });
};

module.exports = { addTable };
