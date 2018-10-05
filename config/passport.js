// 1. https://github.com/themikenicholson/passport-jwt
// 2. Extracts the user data from the given payload
// 3. To search for the user that comes with the payload
const JwtStrategy = require('passport-jwt').Strategy;
const JwtExtract = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

// Employee model
const Employee = mongoose.model('Employee');

// The key is sent with the request, we need it for validation
const keys = require('./keys');

// TODO: Set jwt expiration
// Empty object for our options
const opts = {};

// Options is an object literal containing options to control
// how the token is extracted from the request or verified.
opts.jwtFromRequest = JwtExtract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// Documentation
// https://www.npmjs.com/package/passport-jwt
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      Employee.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.error(err));
    })
  );
};
