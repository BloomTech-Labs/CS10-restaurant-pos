// Verify Roles for Authentication
const verifyRole = require('../../validation/verifyRole');
const Item = require('../../models/Item');

// @route   PUT api/items/update/:id
// @desc    Updates the food item in the database
// @access  Private
const updateItem = (req, res) => {
  const { id } = req.params;
  const itemToUpdate = req.body;

  // Verify roles
  if (!verifyRole(req.user)) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  // updates the item and sends back the updated document
  Item.findOneAndUpdate({ _id: id }, itemToUpdate, { new: true })
    .then((updatedItem) => {
      res.status(200).json({ updatedItem });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
};

module.exports = { updateItem };
