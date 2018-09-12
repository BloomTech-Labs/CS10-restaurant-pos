const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// Create Schema
const Order = new Schema({
  table: {
    type: ObjectId,
    ref: 'Table',
    required: true,
  },
  server: {
    type: ObjectId,
    ref: 'Employee',
    required: true,
  },
  food: [
    {
      type: ObjectId,
      ref: 'Item',
      required: true,
    },
  ],
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  last4: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', Order);
