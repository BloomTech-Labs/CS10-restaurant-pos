const express = require('express');

const router = express.Router();

// Import Table Model
const Table = require('../models/Table');

// @route   POST api/tables/add
// @desc    Adds a new table to the database
// @access  Private
router.post('/add', (req, res) => {
  const { x, y } = req.body;
  const newTable = new Table({ x, y });

  newTable
    .save()
    .then((addedTable) => {
      res.status(200).json(addedTable);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// @route   GET api/tables/all
// @desc    Get all tables
// @access  Private
router.get('/all', (req, res) => [
  Table.find({})
    .then((tables) => {
      res.status(200).json(tables);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
]);

// @route   GET api/tables/:id
// @desc    Get a table by the ID
// @access  Private

// @route   PUT api/tables/update/:id
// @desc    Update a table by its ID
// @access  Private

// @route   PUT api/tables/deactivate/:id
// @desc    Deactivate a table by its ID
// @access  Private

// @route   DELETE api/tables/delete/:id
// @desc    Delete a table by its ID
// @access  Private

module.exports = router;
