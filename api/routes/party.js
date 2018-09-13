const express = require('express');

const router = express.Router();

// Import Party Model
const Party = require('../models/Party');

// @route   POST api/party/add
// @desc    Adds a new party to the database
// @access  Private
router.post('/add', (req, res) => {
  // ? Does this comment need to change to refer to Parties instead?
  // tables SHOULD BE AN ARRAY of Table ObjectIds!
  const { tables, server } = req.body;

  // makes a new party with the provided tables array
  const newParty = new Party({ tables, server });

  newParty
    .save()
    .then(addedParty => {
      res.status(200).json(addedParty);
    })
    .catch(err => {
      res.status(400).json(err);
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
    .then(updatedParty => {
      res.status(200).json(updatedParty);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   DELETE api/party/delete/:id
// @desc    Removes party from the database
// @access  Private
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  Party.findOneAndRemove({ _id: id })
    .then(removedParty => {
      res.status(200).json({ removedParty, msg: 'Party has been removed.' });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   GET api/party/all
// @desc    Retrieves all parties from the database
// @access  Private
router.get('/all', (req, res) => {
  Party.find({})
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .populate('tables')
    .then(parties => {
      res.status(200).json(parties);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   GET api/party/:id
// @desc    Retrieves a specific party from the database by id
// @access  Private
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Party.findOne({ _id: id })
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .populate('tables')
    .then(party => {
      res.status(200).json(party);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
