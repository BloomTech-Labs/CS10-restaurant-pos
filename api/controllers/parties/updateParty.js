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
      updatedParty
        .populate('food')
        .populate('server', ['name'])
        .populate('tables')
        .execPopulate()
        .then(populatedParty => {
          res.status(200).json({ updatedParty: populatedParty });
        })
        .catch(err => {
          res.status(500).json({
            err,
            msg: 'There was an error populating the party.'
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error updating the party in the DB.'
      });
    });
};

module.exports = { updateParty };
