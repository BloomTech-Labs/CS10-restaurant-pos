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
  tableNumber: [
    {
      type: Number,
    },
  ],
});

module.exports = mongoose.model('Table', TableSchema);
