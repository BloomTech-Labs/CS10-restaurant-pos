const mongoose = require('mongoose');

const { Schema } = mongoose;

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
  }
});

module.exports = mongoose.model('Table', TableSchema);
