const stripeKey = require('../../../config/keys').stripeSecretKey;

// eslint-disable-next-line
const stripe = require('stripe')(stripeKey);
const Restaurant = require('../../models/Restaurant');

const checkout = (req, res) => {
  const { stripeToken, amount, description } = req.body;

  // find restaurant to get email
  Restaurant
    .findOne({ _id: req.user.restaurant })
    .then(restaurant => {
      const { email } = restaurant;

      // create a new customer with the token provided
      stripe.customers.create({
        email,
        source: stripeToken
      })
        .then(customer => {
          // create the charge for the customer
          stripe.charges.create({
            amount,
            description,
            currency: 'usd',
            customer: customer.id
          })
            .then(() => {
              res.status(200).json({ msg: 'Success!' });
            })
            .catch(err => {
              res.status(500).json({ err, msg: 'There was a problem charging the card.' });
            });
        }).catch(err => {
          res.status(500).json({ err, msg: 'There was an error creating the customer.' });
        });
    }).catch(err => {
      res.status(500).json({ err, msg: 'There was an error retrieving the restaurant info.' });
    });
};

module.exports = { checkout };
