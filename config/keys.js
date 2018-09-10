const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  clientURI: process.env.HEROKU_URI || process.env.LOCAL_SERVER,
  secretOrKey: process.env.SECRET_OR_KEY,
};
