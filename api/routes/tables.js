const express = require('express');

const router = express.Router();

// Import Table Model
const Table = require('../models/Table');
const Party = require('../models/Party');
const verifyFields = require('../validation/verifyFields');
const verifyRole = require('../validation/verifyRole');

// @route   POST api/tables/add
// @desc    Adds a new table to the database
// @access  Private
router.post('/add', (req, res) => {
  // Verify Role
  verifyRole(req.user, res);

  const { x, y, number } = req.body;

  // this will send back an error response if the requirements are not met
  // otherwise it will continue running the rest of the code
  verifyFields(['x', 'y', 'number'], req.body, res);

  const newTable = new Table({ x, y, number });

  newTable
    .save()
    .then((addedTable) => {
      res.status(201).json(addedTable);
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error saving the table to the database.',
      });
    });
});

// @route   GET api/tables/all
// @desc    Get all tables
// @access  Private
router.get('/all', (req, res) => {
  Table.find({})
    .then((tables) => {
      res.status(200).json(tables);
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the tables from the DB.',
      });
    });
});

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
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the table from the DB.',
      });
    });
});

// @route   POST api/tables/update
// @desc    Update all tables in the database
// @access  Private
router.post('/update', (req, res) => {
  // Verify Roles
  verifyRole(req.user, res);

  // checks if the required fields exist on the request, sends an error back if not
  verifyFields(['tables'], req.body, res);

  const { tables } = req.body;

  // map over tables from req.body, update each and return the promise
  const promises = tables.map((table) => (
    Table.findOneAndUpdate({ _id: table._id }, table, { new: true })
  ));

  // pass promises array into Promise.all and send the client the list of resolved promises
  // eslint-disable-next-line compat/compat
  Promise.all(promises)
    .then((updatedTables) => {
      res.status(200).json(updatedTables);
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error updating the table in the DB.',
      });
    });
});

// @route   PUT api/tables/deactivate/:id
// @desc    Deactivate a table by its ID
// @access  Private
router.put('/deactivate/:id', async (req, res) => {
  const { id } = req.params;
  let updatedTable;
  let party;

  // Deactivates a Table
  try {
    updatedTable = await Table.findOneAndUpdate({ _id: id }, { active: false });
  } catch (err) {
    res.status(500).json({
      err,
      msg: 'There was an error deactivating the table in the DB.',
    });
  }

  // Locate the party associated with the table
  try {
    party = await Party.findOne({ tables: id });
  } catch (err) {
    res.status(500).json({
      err,
      msg: 'There was an error deactivating the table in the DB.',
    });
  }

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
            updatedTable,
          });
        })
        .catch((err) => {
          res.status(500).json({
            err,
            msg: 'There was an error communicating with the DB.',
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error deactivating the table in the DB.',
      });
    });
});

// @route   DELETE api/tables/delete/:id
// @desc    Delete a table by its ID
// @access  Private
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  // Verify Roles
  verifyRole(req.user, res);

  Table.findOneAndRemove({ _id: id })
    .then((removedTable) => {
      Table.update(
        { number: { $gt: removedTable.number } },
        { $inc: { number: -1 } },
        { multi: true }
      ).catch((err) => {
        res.status(500).json({
          err,
          msg: 'There was an error updating the table numbers.',
        });
      });

      Table.find({})
        .then((tables) => {
          res
            .status(200)
            .json({ tables, msg: 'Table deleted from the database.' });
        }).catch(err => {
          res
            .status(500)
            .json({ err, msg: 'There was an error retrieving the tables from the database.' });
        });
    })
    .catch((err) => {
      res.status(400).catch({
        err,
        msg: 'There was an error removing the table from the DB.',
      });
    });
});

module.exports = router;
