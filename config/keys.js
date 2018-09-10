const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  clientURI: process.env.CLIENT_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
};
