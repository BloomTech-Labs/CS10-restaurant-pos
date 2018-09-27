const stripeKey = require('../../config/keys').stripeSecretKey;

// eslint-disable-next-line
const stripe = require('stripe')(stripeKey);
const Restaurant = require('../models/Restaurant');

// Validate the membership status of a Restaurant
const verifyMembership = (id) => {
  // if no id is passed in, theere is no restaurant, so no subscription
  if (!id) {
    return false;
  }

  return Restaurant.findOne({ _id: id })
    .then((restaurant) => {
      // if the restaurant doesn't have a subscription token, return false
      if (!restaurant.subscription) return false;
      // Retrieve the membership status from Stripe
      return stripe.subscriptions
        .retrieve(restaurant.subscription)
        .then((subscription) => {
          // Check whether or not the subscription is active
          if (restaurant.membership !== (subscription.status === 'active')) {
            // Update the membership status on Restaurant
            restaurant.membership = subscription.status === 'active';
            return restaurant
              .save()
              .then(() => subscription.status === 'active')
              .catch((err) => ({
                err,
                msg:
                  'There was an error updating the restaurant in the database.',
              }));
          }
          return subscription.status === 'active';
        })
        .catch((err) => ({
          err,
          msg: 'There was an error retrieving the stripe subscription.',
        }));
    })
    .catch((err) => ({
      err,
      msg: 'There was an error retrieving the restaurant from the database.',
    }));
};

module.exports = verifyMembership;
