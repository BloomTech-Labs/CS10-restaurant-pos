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
    .then(addedTable => {
      res.status(200).json(addedTable);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
