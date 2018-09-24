// Import Models
const Table = require('../../models/Table');
const Party = require('../../models/Party');

// @route   PUT api/tables/deactivate/:id
// @desc    Deactivate a table by its ID
// @access  Private
const deactivateTable = async (req, res) => {
  const { id } = req.params;
  let updatedTable;
  let party;

  // Deactivates a Table
  try {
    updatedTable = await Table.findOneAndUpdate({ _id: id }, { active: false });
  } catch (err) {
    res.status(500).json({
      err,
      msg: 'There was an error deactivating the table in the DB.',
    });
  }

  // Locate the party associated with the table
  try {
    party = await Party.findOne({ tables: id });
  } catch (err) {
    res.status(500).json({
      err,
      msg: 'There was an error deactivating the table in the DB.',
    });
  }

  // Filter allParties to remove inactive Tables
  party.tables = party.tables.filter((table) => String(table) !== id);

  // Save the parties
  party
    .save()
    .then((updatedParty) => {
      updatedParty
        .populate('server', ['name'])
        .populate('tables')
        .execPopulate()
        .then((populatedParty) => {
          res.status(200).json({
            updatedParty: populatedParty,
            msg: 'Table has been deactivated and removed from the party.',
            updatedTable,
          });
        })
        .catch((err) => {
          res.status(500).json({
            err,
            msg: 'There was an error communicating with the DB.',
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error deactivating the table in the DB.',
      });
    });
};

module.exports = { deactivateTable };
