// verifyFields verifies that all required fields are provided
const verifyFields = require('../../validation/verifyFields');
// Verify Roles for Authentication
const verifyRole = require('../../validation/verifyRole');
const Item = require('../../models/Item');

// @route   POST api/items/add
// @desc    Adds a new food item
// @access  Private
const addItem = (req, res) => {
  const {
    name,
    price,
    description,
    category,
    images
  } = req.body;

  // Validate Fields
  const missingFields = verifyFields(['name', 'price'], req.body, res);

  if (missingFields.length > 0) {
    return res
      .status(422)
      .json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

  // Verify roles
  if (!verifyRole(req.user)) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  // create the new Item
  const newItem = new Item({
    name,
    price,
    description,
    category,
    images,
    restaurant: req.user.restaurant,
  });

  // save the new item to the database
  newItem
    .save()
    .then(() => {
      Item.find({ restaurant: req.user.restaurant })
        .then((items) => {
          res.status(201).json({ items });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ err, msg: 'Error communicating with the database.' });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'Error saving the item to the database.' });
    });
};

module.exports = { addItem };
