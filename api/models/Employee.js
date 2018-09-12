const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
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
  role: {
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

// Pre-Save Hook
Employee.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Check password
Employee.methods.checkPassword = function (providedPass) {
  return bcrypt.compare(providedPass, this.password);
};

module.exports = mongoose.model('Employee', Employee);
