const jwt = require('jsonwebtoken');

const keys = require('../../../config/keys');

const stripeKey = keys.stripeSecretKey;

// eslint-disable-next-line
const stripe = require('stripe')(stripeKey);
const Restaurant = require('../../models/Restaurant');

// @route   POST api/subscribe
// @desc    Creates a subscription for an admin
// @access  Private
const subscribe = (req, res) => {
  const { stripeToken, email } = req.body;
  const id = req.user.restaurant;

  Restaurant.findOne({ _id: id })
    .then((restaurant) => {
      if (restaurant.membership) {
        res.status(400).json({ msg: 'You are already subscribed!' });
      } else {
        stripe.customers.create(
          {
            email,
            source: stripeToken,
          },
          (err, customer) => {
            if (err) {
              res.status(400).json({
                err,
                msg: 'Something went wrong creating the customer!',
              });
            } else {
              const { id: customerId } = customer;
              stripe.subscriptions.create(
                {
                  customer: customerId,
                  items: [
                    {
                      plan: 'plan_Db7wsyXgtzAWBN',
                    },
                  ],
                },
                (error, subscription) => {
                  if (error) {
                    res.status(400).json({
                      err,
                      message: 'Error subscribing',
                    });
                  } else {
                    restaurant.subscription = subscription.id;
                    restaurant.membership = true;
                    restaurant.save();

                    // decode the token
                    const token = jwt.verify(
                      req.headers.authorization.slice(7),
                      keys.secretOrKey
                    );

                    // make a new token with the same info, but membership = true
                    const payload = {
                      ...token,
                      membership: true,
                    };

                    // send back the new token so the client can use premium features
                    res.status(200).json({
                      token: `Bearer ${jwt.sign(payload, keys.secretOrKey)}`,
                      msg: 'Successfully Subscribed',
                    });
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
        msg: 'Something went wrong communicating with the database!',
      });
    });
};

module.exports = { subscribe };
