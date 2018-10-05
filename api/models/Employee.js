const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongooseTypes = require('mongoose-types');
// Loads into Mongoose Schema Types
mongooseTypes.loadTypes(mongoose, 'email');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { Email } = mongoose.SchemaTypes;

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
    max: 4,
  },
  email: {
    type: Email,
    unique: true,
    sparse: true
  },
  role: {
    admin: {
      type: Boolean,
      default: false,
    },
    manager: {
      type: Boolean,
      default: false,
    },
  },
  images: {
    thumbnail: String,
    small: String,
    medium: String,
  },
  restaurant: {
    type: ObjectId,
    ref: 'Restaurant',
  },
  themeColor: String,
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
