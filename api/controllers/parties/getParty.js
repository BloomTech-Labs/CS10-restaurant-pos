// Import Party Model
const Party = require('../../models/Party');
// Auth Checking
const verifyFields = require('../../validation/verifyFields');

// @route   GET api/party/:id
// @desc    Retrieves a specific party from the database by id
// @access  Private
const getParty = (req, res) => {
  const { id } = req.params;

  // Verify Fields
  verifyFields(['id'], req.params, res);

  Party.findOne({ _id: id })
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .populate('tables')
    .then((party) => {
      res.status(200).json(party);
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the party from the DB.'
      });
    });
};

module.exports = { getParty };
