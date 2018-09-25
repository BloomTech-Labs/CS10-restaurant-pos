const Item = require('../../models/Item');

// @route   GET api/items/:id
// @desc    Retrieves the food item with the given id
// @access  Private
const getItem = (req, res) => {
  const { id } = req.params;

  Item.findOne({ _id: id })
    .then((item) => {
      res.status(200).json({ item });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communication with the database.' });
    });
};

module.exports = { getItem };
