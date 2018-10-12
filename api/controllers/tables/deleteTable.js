// Import Table Model
const Table = require('../../models/Table');
const Party = require('../../models/Party');
const verifyRole = require('../../validation/verifyRole');

// @route   DELETE api/tables/delete/:id
// @desc    Delete a table by its ID
// @access  Private
const deleteTable = (req, res) => {
  const { id } = req.params;

  // Verify roles
  if (!verifyRole(req.user)) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  Party.findOne({ tables: id })
    .then((party) => {
      if (party) {
        return res
          .status(400)
          .json({ msg: 'You cannot delete a table with an active party!' });
      }
      Table.findOneAndRemove({ _id: id })
        .then((removedTable) => {
          Table.update(
            {
              number: { $gt: removedTable.number },
              restaurant: req.user.restaurant,
            },
            { $inc: { number: -1 } },
            { multi: true }
          )
            .then(() => {
              Table.find({ restaurant: req.user.restaurant })
                .then((tables) => {
                  res
                    .status(200)
                    .json({ tables, msg: 'Table deleted from the database.' });
                })
                .catch((err) => {
                  res.status(500).json({
                    err,
                    msg:
                      'There was an error retrieving the tables from the database.',
                  });
                });
            })
            .catch((err) => {
              res.status(500).json({
                err,
                msg: 'There was an error updating the table numbers.',
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            err,
            msg: 'There was an error removing the table from the DB.',
          });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          err,
          msg: 'There was an error communicating with the database.',
        });
    });
};

module.exports = { deleteTable };
