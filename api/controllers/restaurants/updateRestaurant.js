const nodeFetch = require('node-fetch');

const Restaurant = require('../../models/Restaurant');
const keys = require('../../../config/keys');

// @route   PUT api/restaurants/update/:id
// @desc    Updates the food item in the database
// @access  Private
const updateRestaurant = (req, res) => {
  const { id } = req.params;
  const restaurantToUpdate = req.body;

  // Verify that the current user is an admin
  if (!req.user.role.admin) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  const encodedHeader = Buffer.from(`${keys.avalaraAccountId}:${keys.avalaraLicense}`).toString('base64');
  nodeFetch(
    `https://rest.avatax.com/api/v2/taxrates/bypostalcode?country=US&postalCode=${
      req.body.location
    }`,
    {
      headers: { Authorization: `Basic ${encodedHeader}` }
    }
  )
    .then(response => response.json())
    .then(json => {
      // updates the item with the new tax rate and sends back the updated document
      Restaurant.findOneAndUpdate(
        { _id: id },
        { ...restaurantToUpdate, taxRate: json.totalRate },
        { new: true }
      )
        .then((updatedRestaurant) => {
          res.status(200).json({ updatedRestaurant });
        })
        .catch((err) => {
          res.status(500).json({ err, msg: 'Error communicating with the database.' });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'There was an error fetching the tax rate for your location.' });
    });
};

module.exports = { updateRestaurant };
