const express = require('express');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');

// const keys = require('../../config/keys');
// const Employee = require('../models/Employee');

const router = express.Router();

// @route   GET api/subscriptions/test
// @desc    Tests subscription routes
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Subscription Routes Work' }));

module.exports = router;
