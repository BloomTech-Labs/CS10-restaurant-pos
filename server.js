if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv'); // eslint-disable-line global-require
  dotenv.config();
}

const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');

const { mongoURI: db, clientURI } = require('./config/keys');
// Route Imports
const employeeRoutes = require('./api/routes/employeeRoutes');
const itemRoutes = require('./api/routes/itemRoutes');
const restaurantRoutes = require('./api/routes/restaurantRoutes');
const orderRoutes = require('./api/routes/orderRoutes');
const partyRoutes = require('./api/routes/partyRoutes');
const stripeRoutes = require('./api/routes/stripeRoutes');
const tableRoutes = require('./api/routes/tableRoutes');

// TODO: Setup morgan
const corsOptions = {
  origin: [clientURI, 'https://optimistic-pare-7d0360.netlify.com'],
  credentials: true
};

// Initialize Server
const server = express();

// Middleware
server.use(express.json());
server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: false }));

// Done for performance improvements by 5% or more
server.use(helmet(
  {
    dnsPrefetchControl: { allow: true }
  }
));

// Connect to MongDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Passport Middleware
server.use(passport.initialize());

// Passes passport to passport.js
require('./config/passport.js')(passport);

// Initialize PORT
const PORT = process.env.PORT || 5000;

// Test route
server.post('/api', (req, res) => {
  res.status(200).json({ message: 'Success' });
});

// Routes
employeeRoutes(server, passport.authenticate('jwt', { session: false }));
itemRoutes(server, passport.authenticate('jwt', { session: false }));
restaurantRoutes(server, passport.authenticate('jwt', { session: false }));
orderRoutes(server, passport.authenticate('jwt', { session: false }));
partyRoutes(server, passport.authenticate('jwt', { session: false }));
stripeRoutes(server, passport.authenticate('jwt', { session: false }));
tableRoutes(server, passport.authenticate('jwt', { session: false }));

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`Server running on port: ${PORT}`);
  });
}

// * This must be at the bottom of the file
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = server;
