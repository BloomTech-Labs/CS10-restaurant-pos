const express = require('express');

// Require Item Model
const Item = require('../models/Item');
// verifyFields verifies that all required fields are provided
const verifyFields = require('../validation/verifyFields');
// Require `verifyRole` Authentication Check
const verifyRole = require('../validation/verifyRole');

const router = express.Router();

// @route   POST api/items/add
// @desc    Adds a new food item
// @access  Private
router.post('/add', (req, res) => {
  const {
    name,
    price,
    description,
    category
  } = req.body;

  // Validate Fields
  verifyFields(['name', 'price'], req.body, res);

  // Verify Roles
  verifyRole(req.user, res);

  // create the new Item
  const newItem = new Item({
    name,
    price,
    description,
    category,
    restaurant: req.user.restaurant
  });

  // save the new item to the database
  newItem
    .save()
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error saving the item to the database.' });
    });
});

// @route   GET api/items/all
// @desc    Retrieves all the food items in the DB
// @access  Private
router.get('/all', (req, res) => {
  Item.find({ restaurant: req.user.restaurant })
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
});

// @route   GET api/items/:id
// @desc    Retrieves the food item with the given id
// @access  Private
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Item.findOne({ _id: id, restaurant: req.user.restaurant })
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communication with the database.' });
    });
});

// @route   PUT api/items/update/:id
// @desc    Updates the food item in the database
// @access  Private
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const itemToUpdate = req.body;

  // Verify Roles
  verifyRole(req.user, res);

  // updates the item and sends back the updated document
  Item.findOneAndUpdate({ _id: id }, itemToUpdate, { new: true })
    .then((updatedItem) => {
      res.status(200).json(updatedItem);
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
});

// @route   DELETE api/items/delete/:id
// @desc    Removes the food item from the database
// @access  Private
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  // Verify Roles
  verifyRole(req.user, res);

  Item.findOneAndRemove({ _id: id, restaurant: req.user.restaurant })
    .then((removedItem) => {
      res.status(200).json({ removedItem, msg: 'Item deleted from the database.' });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'Error communicating with the database.' });
    });
});

module.exports = router;
