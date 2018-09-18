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

  const { x, y } = req.body;

  // this will send back an error response if the requirements are not met
  // otherwise it will continue running the rest of the code
  verifyFields(['x', 'y'], req.body, res);

  const newTable = new Table({ x, y, restaurant: req.user.restaurant });

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
router.get('/all', (req, res) => [
  Table.find({ restaurant: req.user.restaurant })
    .then((tables) => {
      res.status(200).json(tables);
    })
    .catch((err) => {
      res.status(400).json(err);
    }),
]);

// @route   GET api/tables/:id
// @desc    Get a table by the ID
// @access  Private
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Table.findOne({ _id: id, restaurant: req.user.restaurant })
    .then((table) => {
      res.status(200).json(table);
    })
    .catch((err) => {
      res.status(200).json(err);
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
    Table.findOneAndUpdate(
      { _id: table._id, restaurant: req.user.restaurant },
      table,
      { new: true }
    )
  ));

  // pass promises array into Promise.all and send the client the list of resolved promises
  // eslint-disable-next-line compat/compat
  Promise.all(promises)
    .then((updatedTables) => {
      res.status(200).json(updatedTables);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// @route   PUT api/tables/deactivate/:id
// @desc    Deactivate a table by its ID
// @access  Private
router.put('/deactivate/:id', async (req, res) => {
  const { id } = req.params;

  // Deactivates a Table
  const updatedTable = await Table.findOneAndUpdate(
    { _id: id, restaurant: req.user.restaurant },
    { active: false }
  );

  // Locate all parties
  const party = await Party.findOne({
    tables: id,
    restaurant: req.user.restaurant,
  });

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

  // Verify Roles
  verifyRole(req.user, res);

  Table.findOneAndRemove({ _id: id, restaurant: req.user.restaurant })
    .then((removedTable) => {
      res
        .status(200)
        .json({ removedTable, msg: 'Table deleted from the database.' });
    })
    .catch((err) => {
      res.status(400).catch(err);
    });
});

module.exports = router;
