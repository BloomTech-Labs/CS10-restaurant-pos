const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Order = new Schema({
  party: {
    type: ObjectId,
    ref: 'Party',
    required: true,
  },
  server: {
    type: ObjectId,
    ref: 'Employee',
    required: true,
  },
  food: [
    {
      id: {
        type: ObjectId,
        ref: 'Item',
        required: true
      },
      uniqueId: {
        type: String,
        required: true
      }
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
  restaurant: {
    type: ObjectId,
    ref: 'Restaurant',
    required: true
  }
});

module.exports = mongoose.model('Order', Order);
