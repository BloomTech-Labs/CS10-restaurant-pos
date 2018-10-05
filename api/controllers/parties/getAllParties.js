// Import Party Model
const Party = require('../../models/Party');

// @route   GET api/party/all
// @desc    Retrieves all parties from the database
// @access  Private
const getAllParties = (req, res) => {
  Party.find({ restaurant: req.user.restaurant })
    .populate('server', ['name'])
    .populate({ path: 'food._id', model: 'Item' })
    .populate('tables')
    .then((parties) => {
      const reformattedParties = parties.map(party => ({
        ...party._doc,
        food: party.food.map(food => ({
          uniqueId: food.uniqueId,
          ...food._id._doc,
        }))
      }));
      res.status(200).json({ parties: reformattedParties });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the parties from the DB.'
      });
    });
};

module.exports = { getAllParties };
