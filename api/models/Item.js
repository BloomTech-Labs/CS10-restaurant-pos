const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String
  },
  category: {
    type: String,
  },
  restaurant: {
    type: ObjectId,
    ref: 'Restaurant',
    required: true
  }
});

module.exports = mongoose.model('Item', ItemSchema);
