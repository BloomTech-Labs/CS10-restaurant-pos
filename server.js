if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv'); // eslint-disable-line global-require
  dotenv.config();
}

const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const { mongoURI: db, clientURI } = require('./config/keys');
const employees = require('./api/routes/employees');
const items = require('./api/routes/items');
const party = require('./api/routes/party');
const orders = require('./api/routes/orders');
const tables = require('./api/routes/tables');
const subscriptions = require('./api/routes/subscriptions');

const corsOptions = { origin: clientURI, credentials: true };

// Initialize Server
const server = express();

// Middleware
server.use(express.json());
server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: false }));

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

// Use Routes
server.post('/api', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'Success' });
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Routes
server.use('/api/employees', employees);
server.use(
  '/api/items',
  passport.authenticate('jwt', { session: false }),
  items
);
server.use(
  '/api/party',
  passport.authenticate('jwt', { session: false }),
  party
);
server.use(
  '/api/orders',
  passport.authenticate('jwt', { session: false }),
  orders
);
server.use(
  '/api/tables',
  passport.authenticate('jwt', { session: false }),
  tables
);
server.use(
  '/api/subscriptions',
  passport.authenticate('jwt', { session: false }),
  subscriptions
);

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server running on port: ${PORT}`);
});
