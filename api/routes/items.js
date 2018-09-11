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
    })
})

module.exports = router;
