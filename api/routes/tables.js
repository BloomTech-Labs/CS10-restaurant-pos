const express = require('express');
const router = express.Router();

// Import Table Model
const Table = require('../models/Table');

// @route   POST api/tables/add
// @desc    Adds a new table to the database
// @access  Private
router.post('/add', (req, res) => {
  // tableNumber SHOULD BE AN ARRAY
  const { tableNumbers } = req.body;

  // makes a new table with the provided table numbers array
  const newTable = new Table({ tableNumbers });

  newTable
    .save()
    .then(table => {
      res.status(200).json(table);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   PUT api/tables/update/:id
// @desc    Updates information in table
// @access  Private
router.put('/update/:id', (req, res) => {
  const { server, food, tableNumbers } = req.body;
  const { id } = req.params;

  Table.findOneAndUpdate({ _id: id }, { server, food, tableNumbers }, { new: true })
    .then(updatedTable => {
      res.status(200).json(updatedTable);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   DELETE api/tables/delete/:id
// @desc    Removes table from the database
// @access  Private
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  Table.findOneAndRemove({ _id: id })
  .then(removedTable => {
    res.status(200).json({removedTable, msg: 'Table has been removed.'})
  })
  .catch(err => {
    res.status(400).json(err);
  })
})

module.exports = router;
