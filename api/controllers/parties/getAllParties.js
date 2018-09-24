// Import Party Model
const Party = require('../../models/Party');

// @route   GET api/party/all
// @desc    Retrieves all parties from the database
// @access  Private
const getAllParties = (req, res) => {
  Party.find({ restaurant: req.user.restaurant })
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .populate('tables')
    .then((parties) => {
      res.status(200).json({ parties });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the parties from the DB.'
      });
    });
};

module.exports = { getAllParties };
