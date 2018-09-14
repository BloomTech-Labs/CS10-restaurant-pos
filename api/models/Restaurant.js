const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const RestaurantSchema = new Schema({
  admin: {
    type: ObjectId,
    ref: 'Employee',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  billing: {
    address: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
  },
  subscription: String,
  membership: {
    type: Boolean,
    default: false,
  },
  width: Number,
  height: Number,
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
