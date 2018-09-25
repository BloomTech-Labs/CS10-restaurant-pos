const stripeKey = require('../../../config/keys').stripeSecretKey;

// eslint-disable-next-line
const stripe = require('stripe')(stripeKey);
const Restaurant = require('../../models/Restaurant');

const updateSubscription = (req, res) => {
  const { restaurant } = req.user;

  // Access the current subscription id
  Restaurant.findOne({ _id: restaurant })
    .then(async foundRestaurant => {
      let subStatus;
      // If the current plan is yearly
      if (foundRestaurant.subscription === 'plan_DfLtVq11oYqHm5') {
        // Assign the substatus to the monthly plan
        subStatus = 'plan_Db7wsyXgtzAWBN';
      } else {
        // Otherwise, set the plan to yearly
        subStatus = 'plan_DfLtVq11oYqHm5';
      }

      // call stripe.update to update the subscription
      const subscription = await stripe.subscriptions.retrieve(foundRestaurant.subscription);
      stripe.subscriptions.update(foundRestaurant.subscription, {
        cancel_at_period_end: false,
        items: [{
          id: subscription.items.data[0].id,
          plan: subStatus,
        }]
      });

      res.status(200).json({ msg: 'Subscription successfully updated.' });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: 'There was an error communicating with the server.'
      });
    });
};

module.exports = { updateSubscription };
