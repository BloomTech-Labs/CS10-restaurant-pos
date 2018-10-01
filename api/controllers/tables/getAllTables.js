// Import Table Model
const Table = require('../../models/Table');
const Party = require('../../models/Party');

// @route   GET api/tables/all
// @desc    Get all tables
// @access  Private
const getAllTables = (req, res) => {
  const { server } = req.query;

  Table.find({ restaurant: req.user.restaurant })
    .then((tables) => {
      if (server !== 'undefined') {
        Party.find({ server })
          .populate('tables', ['number'])
          .then((parties) => {
            let serverTables = [];
            parties.forEach((party) => {
              serverTables.push(...party.tables);
            });
            serverTables = serverTables.map(table => table.number);
            res.status(200).json({ tables, serverTables });
          })
          .catch((err) => {
            res.status(500).json({
              err,
              msg: "There was an error finding the server's associated tables."
            });
          });
      } else {
        res.status(200).json({ tables, serverTables: [] });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the tables from the DB.'
      });
    });
};

module.exports = { getAllTables };
