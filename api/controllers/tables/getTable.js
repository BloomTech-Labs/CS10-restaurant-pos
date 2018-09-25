// Import Table Model
const Table = require('../../models/Table');

// @route   GET api/tables/:id
// @desc    Get a table by the ID
// @access  Private
const getTable = (req, res) => {
  const { id } = req.params;

  Table.findOne({ _id: id })
    .then((table) => {
      res.status(200).json({ table });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the table from the DB.',
      });
    });
};

module.exports = { getTable };
