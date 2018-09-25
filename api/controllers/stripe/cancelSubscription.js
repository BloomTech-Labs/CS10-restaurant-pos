const stripeKey = require('../../../config/keys').stripeSecretKey;

// eslint-disable-next-line
const stripe = require('stripe')(stripeKey);
const Restaurant = require('../../models/Restaurant');

const cancelSubscription = (req, res) => {
  const { restaurant } = req.user;

  // Access the current subscription id
  Restaurant.findOne({ _id: restaurant })
    .then(foundRestaurant => {
      // call stripe.update and cancel the subscription
      stripe.subscriptions.update(foundRestaurant.subscription,
        { cancel_at_period_end: true });

      res.status(200).json({ msg: 'Subscription will expire at the end of this billing cycle.' });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: 'There was an error communicating with the server.'
      });
    });
};

module.exports = { cancelSubscription };
