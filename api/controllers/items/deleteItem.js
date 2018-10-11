// Verify Roles for Authentication
const verifyRole = require('../../validation/verifyRole');
const Item = require('../../models/Item');

// @route   DELETE api/items/delete/:id
// @desc    Removes the food item from the database
// @access  Private
const deleteItem = (req, res) => {
  const { id } = req.params;

  // Verify roles
  if (!verifyRole(req.user)) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  Item.findOneAndRemove({ _id: id })
    .then((removedItem) => {
      if (!removedItem) {
        return res.status(404).json({ msg: 'Item was not found.' });
      }
      res.status(200).json({ removedItem, msg: `${removedItem.name} was deleted from the database.` });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
};

module.exports = { deleteItem };
