const express = require('express');

const router = express.Router();

// Import Party Model
const Party = require('../models/Party');
const Table = require('../models/Table');
// Auth Checking
const verifyFields = require('../validation/verifyFields');

// @route   POST api/party/add
// @desc    Adds a new party to the database
// @access  Private
router.post('/add', (req, res) => {
  // tables SHOULD BE AN ARRAY of Table ObjectIds!
  const { tables, server } = req.body;

  // Verify Fields
  verifyFields(['tables', 'server'], req.body, res);

  // Map over tables from req.body, update each and return the promise
  const promises = tables.map(table => (
    Table.findOneAndUpdate({ _id: table }, { active: true }, { new: true })
  ));

  // Pass promises into Promise.all
  // eslint-disable-next-line compat/compat
  Promise.all(promises)
    .catch(err => {
      res.status(500).json({
        err,
        msg: 'There was an error setting tables to active in the DB.'
      });
    });

  // makes a new party with the provided tables array
  const newParty = new Party({ tables, server, restaurant: req.user.restaurant });

  newParty
    .save()
    .then((addedParty) => {
      addedParty
        .populate('server', ['name'])
        .populate('tables')
        .execPopulate()
        .then((party) => {
          res.status(200).json(party);
        })
        .catch((err) => res.status(500).json({
          err,
          msg: 'There was an error communicating with the DB.'
        }));
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error saving the party to the DB.'
      });
    });
});

// @route   PUT api/party/update/:id
// @desc    Updates information in party
// @access  Private
router.put('/update/:id', (req, res) => {
  const { server, food, tables } = req.body;
  const { id } = req.params;

  const updatedFields = {};

  if (server) updatedFields.server = server;
  if (food) updatedFields.food = food;
  if (tables) updatedFields.tables = tables;

  Party.findOneAndUpdate({ _id: id }, updatedFields, { new: true })
    .then((updatedParty) => {
      res.status(200).json(updatedParty);
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error updating the party in the DB.'
      });
    });
});

// @route   DELETE api/party/delete/:id
// @desc    Removes party from the database
// @access  Private
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  // Verify Fields
  verifyFields(['id'], req.params, res);

  Party.findOneAndRemove({ _id: id })
    .then(removedParty => {
      const promises = removedParty.tables.map(table => (
        Table.findOneAndUpdate({ _id: table }, { active: false }, { new: true })
      ));

      // Resolve promises setting tables to a false active status
      // eslint-disable-next-line compat/compat
      Promise.all(promises)
        .catch(err => {
          res.status(500).json({
            err,
            msg: 'There was an error updating the table in the DB.'
          });
        });
      return removedParty;
    })
    .then((removedParty) => {
      res.status(200).json({ removedParty, msg: 'Party has been removed.' });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error deleting the party in the DB.'
      });
    });
});

// @route   GET api/party/all
// @desc    Retrieves all parties from the database
// @access  Private
router.get('/all', (req, res) => {
  Party.find({ restaurant: req.user.restaurant })
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .populate('tables')
    .then((parties) => {
      res.status(200).json(parties);
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the parties from the DB.'
      });
    });
});

// @route   GET api/party/:id
// @desc    Retrieves a specific party from the database by id
// @access  Private
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // Verify Fields
  verifyFields(['id'], req.params, res);

  Party.findOne({ _id: id })
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .populate('tables')
    .then((party) => {
      res.status(200).json(party);
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'There was an error retrieving the party from the DB.'
      });
    });
});

module.exports = router;
