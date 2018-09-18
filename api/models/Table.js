const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TableSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  x: {
    type: Number,
  },
  y: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: false,
  },
  restaurant: {
    type: ObjectId,
    ref: 'Restaurant',
    required: true
  }
});

module.exports = mongoose.model('Table', TableSchema);
