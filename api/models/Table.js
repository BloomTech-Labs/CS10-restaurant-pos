const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const TableSchema = new Schema({
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
  tableNumbers: [
    {
      type: Number,
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Table', TableSchema);
