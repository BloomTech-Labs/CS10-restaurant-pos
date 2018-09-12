const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PartySchema = new Schema({
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
  tables: [
    {
      type: ObjectId,
      ref: 'Table',
    },
  ]
});

module.exports = mongoose.model('Party', PartySchema);
