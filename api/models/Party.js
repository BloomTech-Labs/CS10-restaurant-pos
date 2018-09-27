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
      id: {
        type: ObjectId,
        ref: 'Item'
      },
      uniqueId: {
        type: String
      }
    },
  ],
  tables: [
    {
      type: ObjectId,
      ref: 'Table',
    },
  ],
  restaurant: {
    type: ObjectId,
    ref: 'Restaurant',
    required: true
  }
});

module.exports = mongoose.model('Party', PartySchema);
