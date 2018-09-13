const mongoose = require('mongoose');

const { Schema } = mongoose;

const TableSchema = new Schema({
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
});

module.exports = mongoose.model('Table', TableSchema);
