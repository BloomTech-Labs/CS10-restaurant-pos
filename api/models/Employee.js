const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { ObjectId } = Schema.Types;

const Employee = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  status: {
    admin: {
      type: Boolean,
      default: false,
      subscription: String,
      membership: {
        type: Boolean,
        default: false,
      },
    },
    manager: {
      type: Boolean,
      default: false,
    },
  },
  administrator: {
    type: ObjectId,
    ref: 'Employee',
  },
});

module.exports = mongoose.model('Employee', Employee);
