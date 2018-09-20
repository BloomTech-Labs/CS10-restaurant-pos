// Import Table Model
const Table = require('../../models/Table');
const verifyFields = require('../../validation/verifyFields');
const verifyRole = require('../../validation/verifyRole');

// @route   POST api/tables/add
// @desc    Adds a new table to the database
// @access  Private
const addTable = (req, res) => {
  // Verify Role
  verifyRole(req.user, res);

  const { x, y, number } = req.body;

  // this will send back an error response if the requirements are not met
  // otherwise it will continue running the rest of the code
  verifyFields(['x', 'y', 'number'], req.body, res);

  const newTable = new Table({
    x,
    y,
    number,
    restaurant: req.user.restaurant
  });

  newTable
    .save()
    .then((addedTable) => {
      res.status(201).json(addedTable);
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error saving the table to the database.',
      });
    });
};

module.exports = { addTable };
