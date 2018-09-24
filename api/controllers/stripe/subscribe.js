const stripeKey = require('../../../config/keys').stripeSecretKey;

// eslint-disable-next-line
const stripe = require('stripe')(stripeKey);
const Restaurant = require('../../models/Restaurant');

// @route   POST api/subscriptions/subscribe
// @desc    Creates a subscription for an admin
// @access  Private
const subscribe = (req, res) => {
  const { stripeToken, email } = req.body;
  const id = req.user.restaurant;

  Restaurant.findOne({ _id: id })
    .then(restaurant => {
      if (restaurant.membership) {
        res.status(400).json({ msg: 'You are already subscribed!' });
      } else {
        stripe.customers.create(
          {
            email,
            source: stripeToken
          },
          (err, customer) => {
            if (err) {
              res.status(400).json({
                err,
                message: 'Something went wrong creating the customer!'
              });
            } else {
              const { id: customerId } = customer;
              stripe.subscriptions.create(
                {
                  customer: customerId,
                  items: [
                    {
                      plan: 'plan_Db7wsyXgtzAWBN'
                    }
                  ]
                },
                (error, subscription) => {
                  if (error) {
                    res.status(400).json({
                      err,
                      message: 'Error subscribing'
                    });
                  } else {
                    restaurant.subscription = subscription.id;
                    restaurant.membership = true;
                    restaurant.save();
                    res.status(200).json({ message: 'Successfully Subscribed' });
                  }
                }
              );
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        err,
        msg: 'Something went wrong communicating with the database!'
      });
    });
};

module.exports = { subscribe };
