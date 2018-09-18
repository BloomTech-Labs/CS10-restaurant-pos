const express = require('express');

const router = express.Router();

// Import Party Model
const Party = require('../models/Party');

// @route   POST api/party/add
// @desc    Adds a new party to the database
// @access  Private
// TODO: I think this route needs to also look at
// TODO: all the tables that are in the list and mark
// TODO: them as active. We could do multiple requests
// TODO: from our end to make that happen, but I think
// TODO: that that's a less ideal design pattern. wdy think?
router.post('/add', (req, res) => {
  // tables SHOULD BE AN ARRAY of Table ObjectIds!
  const { tables, server } = req.body;

  // makes a new party with the provided tables array
  const newParty = new Party({ tables, server, restaurant: req.user.restaurant });

  newParty
    .save()
    .then((addedParty) => {
      addedParty
        .populate('server', ['name'])
        .execPopulate()
        .then((party) => {
          res.status(200).json(party);
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => {
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

  Party.findOneAndUpdate({ _id: id, restaurant: req.user.restaurant }, updatedFields, { new: true })
    .then((updatedParty) => {
      res.status(200).json(updatedParty);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// @route   DELETE api/party/delete/:id
// @desc    Removes party from the database
// @access  Private
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  Party.findOneAndRemove({ _id: id, restaurant: req.user.restaurant })
    .then((removedParty) => {
      res.status(200).json({ removedParty, msg: 'Party has been removed.' });
    })
    .catch((err) => {
      res.status(400).json(err);
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
      res.status(400).json(err);
    });
});

// @route   GET api/party/:id
// @desc    Retrieves a specific party from the database by id
// @access  Private
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Party.findOne({ _id: id, restaurant: req.user.restaurant })
    .populate('server', ['name'])
    .populate('food', ['name', 'price'])
    .populate('tables')
    .then((party) => {
      res.status(200).json(party);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
