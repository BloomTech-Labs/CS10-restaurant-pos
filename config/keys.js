module.exports = {
  mongoURI: process.env.MONGO_URI,
  clientURI: process.env.HEROKU_URI || 'http://localhost:3000',
  secretOrKey: process.env.SECRET_OR_KEY,
};
