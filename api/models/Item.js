const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
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
  images: {
    thumbnail: String,
    small: String,
    medium: String,
  },
  restaurant: {
    type: ObjectId,
    ref: 'Restaurant',
    required: true
  }
});

module.exports = mongoose.model('Item', ItemSchema);
