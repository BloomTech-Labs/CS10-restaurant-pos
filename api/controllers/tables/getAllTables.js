// Import Table Model
const Table = require('../../models/Table');

// @route   GET api/tables/all
// @desc    Get all tables
// @access  Private
const getAllTables = (req, res) => {
  Table.find({ restaurant: req.user.restaurant })
    .then((tables) => {
      res.status(200).json({ tables });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the tables from the DB.',
      });
    });
};

module.exports = { getAllTables };
