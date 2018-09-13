const express = require('express');

const router = express.Router();

// Import Table Model
const Table = require('../models/Table');
const Party = require('../models/Party');

// @route   POST api/tables/add
// @desc    Adds new tables to the database
// @access  Private
router.post('/add', (req, res) => {
  // tables should be an array of table objects
  const { tables } = req.body;

  Table.insertMany(tables)
    .then((insertedTables) => {
      res.status(201).json(insertedTables);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'Error communicating with the database.' });
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
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Table.findOne({ _id: id })
    .then((table) => {
      res.status(200).json(table);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

// @route   PUT api/tables/update/:id
// @desc    Update a table by its ID
// @access  Private
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const tableToUpdate = req.body;

  Table.findOneAndUpdate({ _id: id }, tableToUpdate, { new: true })
    .then((updatedTable) => {
      res.status(200).json(updatedTable);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// @route   PUT api/tables/deactivate/:id
// @desc    Deactivate a table by its ID
// @access  Private
router.put('/deactivate/:id', async (req, res) => {
  const { id } = req.params;

  // Deactivates a Table
  const updatedTable = await Table.findOneAndUpdate({ _id: id }, { active: false });

  // Locate all parties
  const party = await Party.findOne({ tables: id });

  // Filter allParties to remove inactive Tables
  party.tables = party.tables.filter((table) => String(table) !== id);

  // Save the parties
  party
    .save()
    .then((updatedParty) => {
      updatedParty
        .populate('server', ['name'])
        .populate('tables')
        .execPopulate()
        .then((populatedParty) => {
          res.status(200).json({
            populatedParty,
            msg: 'Table has been deactivated and removed from the party.',
            updatedTable
          });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// @route   DELETE api/tables/delete/:id
// @desc    Delete a table by its ID
// @access  Private
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  Table.findOneAndRemove({ _id: id })
    .then((removedTable) => {
      res.status(200).json({ removedTable, msg: 'Table deleted from the database.' });
    })
    .catch((err) => {
      res.status(400).catch(err);
    });
});

module.exports = router;
