// Import Table Model
const Table = require('../../models/Table');
const verifyFields = require('../../validation/verifyFields');
const verifyRole = require('../../validation/verifyRole');

// @route   POST api/tables/update
// @desc    Update all tables in the database
// @access  Private
const updateAllTables = (req, res) => {
  // Verify Roles
  verifyRole(req.user, res);

  // checks if the required fields exist on the request, sends an error back if not
  verifyFields(['tables'], req.body, res);

  const { tables } = req.body;

  // map over tables from req.body, update each and return the promise
  const promises = tables.map((table) => (
    Table.findOneAndUpdate(
      { _id: table._id },
      table,
      { new: true }
    )
  ));

  // pass promises array into Promise.all and send the client the list of resolved promises
  // eslint-disable-next-line compat/compat
  Promise.all(promises)
    .then((updatedTables) => {
      res.status(200).json(updatedTables);
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error updating the table in the DB.',
      });
    });
};

module.exports = { updateAllTables };
