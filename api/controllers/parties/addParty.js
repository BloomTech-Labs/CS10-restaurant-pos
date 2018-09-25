// Import Party Model
const Party = require('../../models/Party');
const Table = require('../../models/Table');
// Auth Checking
// const verifyFields = require('../../validation/verifyFields');

// @route   POST api/party/add
// @desc    Adds a new party to the database
// @access  Private
const addParty = (req, res) => {
  // tables SHOULD BE AN ARRAY of Table ObjectIds!
  let { tables } = req.body;
  const { id: server } = req.user;

  if (!tables) {
    tables = [];
  }

  // Map over tables from req.body, update each and return the promise
  const promises = tables.map(table => (
    Table.findOneAndUpdate({ _id: table }, { active: true }, { new: true })
  ));

  // Pass promises into Promise.all
  // eslint-disable-next-line compat/compat
  Promise.all(promises)
    .catch(err => {
      res.status(500).json({
        err,
        msg: 'There was an error setting tables to active in the DB.'
      });
    });

  // makes a new party with the provided tables array
  const newParty = new Party({ tables, server, restaurant: req.user.restaurant });

  newParty
    .save()
    .then((addedParty) => {
      addedParty
        .populate('server', ['name'])
        .populate('tables')
        .execPopulate()
        .then((party) => {
          res.status(200).json({ party });
        })
        .catch((err) => res.status(500).json({
          err,
          msg: 'There was an error communicating with the DB.'
        }));
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error saving the party to the DB.'
      });
    });
};

module.exports = { addParty };
