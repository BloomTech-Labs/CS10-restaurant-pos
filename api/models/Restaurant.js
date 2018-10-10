const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const RestaurantSchema = new Schema({
  admin: {
    type: ObjectId,
    ref: 'Employee',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  subscription: String,
  taxRate: {
    type: String,
    required: true
  },
  membership: {
    type: Boolean,
    default: false
  },
  width: Number,
  height: Number,
  currentPIN: {
    type: String,
    default: '1111'
  }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
