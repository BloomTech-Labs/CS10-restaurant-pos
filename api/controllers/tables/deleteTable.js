// Import Table Model
const Table = require('../../models/Table');
const verifyRole = require('../../validation/verifyRole');

// @route   DELETE api/tables/delete/:id
// @desc    Delete a table by its ID
// @access  Private
const deleteTable = (req, res) => {
  const { id } = req.params;

  // Verify Roles
  verifyRole(req.user, res);

  Table.findOneAndRemove({ _id: id })
    .then((removedTable) => {
      Table.update(
        { number: { $gt: removedTable.number }, restaurant: req.user.restaurant },
        { $inc: { number: -1 } },
        { multi: true }
      ).catch((err) => {
        res.status(500).json({
          err,
          msg: 'There was an error updating the table numbers.',
        });
      });

      Table.find({ restaurant: req.user.restaurant })
        .then((tables) => {
          res
            .status(200)
            .json({ tables, msg: 'Table deleted from the database.' });
        }).catch(err => {
          res
            .status(500)
            .json({ err, msg: 'There was an error retrieving the tables from the database.' });
        });
    })
    .catch((err) => {
      res.status(500).catch({
        err,
        msg: 'There was an error removing the table from the DB.',
      });
    });
};

module.exports = { deleteTable };
