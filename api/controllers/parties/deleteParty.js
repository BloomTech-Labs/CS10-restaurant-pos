// Import Party Model
const Party = require('../../models/Party');
const Table = require('../../models/Table');
// Auth Checking
const verifyFields = require('../../validation/verifyFields');

// @route   DELETE api/party/delete/:id
// @desc    Removes party from the database
// @access  Private
const deleteParty = (req, res) => {
  const { id } = req.params;

  // Verify Fields
  verifyFields(['id'], req.params, res);

  Party.findOneAndRemove({ _id: id })
    .then(removedParty => {
      const promises = removedParty.tables.map(table => (
        Table.findOneAndUpdate({ _id: table }, { active: false }, { new: true })
      ));

      // Resolve promises setting tables to a false active status
      // eslint-disable-next-line compat/compat
      Promise.all(promises)
        .catch(err => {
          res.status(500).json({
            err,
            msg: 'There was an error updating the table in the DB.'
          });
        });
      return removedParty;
    })
    .then((removedParty) => {
      res.status(200).json({ removedParty, msg: 'Party has been removed.' });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error deleting the party in the DB.'
      });
    });
};

module.exports = { deleteParty };
