const stripeKey = require('../../config/keys').stripeSecretKey;

// eslint-disable-next-line
const stripe = require('stripe')(stripeKey);
const Restaurant = require('../models/Restaurant');

// Validate the membership status of a Restaurant
const verifyMembership = (id) => {
  if (!id) {
    return false;
  }

  Restaurant.findOne({ _id: id })
    .then((restaurant) => {
      if (!restaurant.subscription) return false;
      // Retrieve the membership status from Stripe
      return stripe.subscriptions.retrieve(restaurant.subscription)
        .then(subscription => {
          // Check whether or not the subscription is active
          if (restaurant.membership !== (subscription.status === 'active')) {
            // Update the membership status on Restaurant
            restaurant.membership = (subscription.status === 'active');
            restaurant.save().catch();
          }
          return subscription.status === 'active';
        })
        .catch();
    }).catch();
};

module.exports = verifyMembership;
