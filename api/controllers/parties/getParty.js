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
  const missingFields = verifyFields(['id'], req.params);

  if (missingFields.length > 0) {
    return res.status(422).json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

  Party.findOne({ _id: id })
    .populate('server', ['name'])
    .populate({ path: 'food._id', model: 'Item' })
    .populate('tables')
    .then((party) => {
      res.status(200).json({ party });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the party from the DB.'
      });
    });
};

module.exports = { getParty };
