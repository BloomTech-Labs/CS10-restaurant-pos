// Import Party Model
const Party = require('../../models/Party');

// @route   PUT api/party/update/:id
// @desc    Updates information in party
// @access  Private
const updateParty = (req, res) => {
  const { server, food, tables } = req.body;
  const { id } = req.params;

  const updatedFields = {};

  if (server) updatedFields.server = server;
  if (food) updatedFields.food = food;
  if (tables) updatedFields.tables = tables;

  Party.findOneAndUpdate({ _id: id }, updatedFields, { new: true })
    .then((updatedParty) => {
      res.status(200).json({ updatedParty });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error updating the party in the DB.'
      });
    });
};

module.exports = { updateParty };
