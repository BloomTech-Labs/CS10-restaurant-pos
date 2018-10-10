const Employee = require('../../models/Employee');
const verifyRole = require('../../validation/verifyRole');

// @route   GET api/employees/all
// @desc    Gets all employees
// @access  Private
const getAllServers = (req, res) => {
  // if the logged in user isn't an admin or manager, they're not authed
  // Verify roles
  if (!verifyRole(req.user)) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  // search query will filter by restaurant by default
  const searchQuery = { restaurant: req.user.restaurant };

  // if the user is a manager, they will only see servers.
  // admins can see all employees
  if (req.user.role.manager && !req.user.role.admin) {
    searchQuery.role = { admin: false, manager: false };
  }

  Employee
    .aggregate([
      { $match: searchQuery },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          images: 1,
          pin: 1,
        },
      },
      {
        $lookup: {
          from: 'parties',
          localField: '_id',
          foreignField: 'server',
          as: 'parties',
        },
      },
      {
        $unwind: {
          path: '$parties',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'parties.food._id',
          foreignField: '_id',
          as: 'parties.food',
        },
      },
      {
        $lookup: {
          from: 'tables',
          localField: 'parties.tables',
          foreignField: '_id',
          as: 'parties.tables',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          role: { $first: '$role' },
          images: { $first: '$images' },
          pin: { $first: '$pin' },
          parties: {
            $push: {
              _id: '$parties._id',
              tables: '$parties.tables',
              food: '$parties.food',
            },
          },
        },
      },
    ])
    .then((populatedParties) => {
      res.status(200).json({ employees: populatedParties });
    })
    .catch(err => {
      res.status(500).json({ err, msg: 'There was an error retrieving the servers.' });
    });
};

module.exports = { getAllServers };
