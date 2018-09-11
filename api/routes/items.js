const express = require('express');
const router = express.Router();

// Require Item Model
const Item = require('../models/Item');

// @route   POST api/items/add
// @desc    Adds a new food item
// @access  Private
router.post('/add', (req, res) => {
  const { name, price, description } = req.body;

  // create the new Item
  const newItem = new Item({ name, price, description });

  // save the new item to the database
  newItem
    .save()
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   GET api/items/all
// @desc    Retrieves all the food items in the DB
// @access  Private
router.get('/all', (req, res) => {
  Item.find({})
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   GET api/items/:name
// @desc    Retrieves the food item with the given name
// @access  Private
router.get('/:name', (req, res) => {
  const { name } = req.params;
  Item.findOne({ name })
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   PUT api/items/:name
// @desc    Updates the food item in the database
// @access  Private
router.put('/:name', (req, res) => {
  const { name } = req.params;
  const updatedItem = req.body;

  // updates the item and sends back the updated document
  Item.findOneAndUpdate({ name }, updatedItem, { new: true })
    .then(updatedItem => {
      res.status(200).json(updatedItem);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
