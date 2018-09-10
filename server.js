const { mongoURI } = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Initialize Server
const server = express();

// Middleware
server.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true },
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Passport Middleware
server.use(passport.initialize());

// Initialize PORT
const PORT = process.env.PORT || 5000;

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(PORT, err => {
  if (err) console.error(err);
  console.log(`Server running on port: ${PORT}`);
});
