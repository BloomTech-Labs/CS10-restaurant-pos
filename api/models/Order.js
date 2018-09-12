const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// Create Schema
const Order = new Schema({
  table: {
    type: ObjectId,
    ref: 'Table',
  },
  server: {
    type: ObjectId,
    ref: 'Employee',
  },
  food: [
    {
      type: ObjectId,
      ref: 'Item',
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
});

module.exports = mongoose.model('Order', Order);
