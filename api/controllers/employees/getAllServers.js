const jwt = require('jsonwebtoken');

const keys = require('../../../config/keys');
const Employee = require('../../models/Employee');

const getAllServers = (req, res) => {
  // if no token exists, send back unauthorized message
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  try {
    // pull the role and the restaurant off the token
    const { role, restaurant } = jwt.verify(req.headers.authorization.slice(7), keys.secretOrKey);

    // if the logged in user isn't an admin or manager, they're not authed
    if (!role.admin && !role.manager) {
      return res.status(401).json({ msg: 'You are not authorized to do this.' });
    }

    // search query will filter by restaurant by default
    const searchQuery = { restaurant };

    // if the user is a manager, they will only see servers.
    // admins can see all employees
    if (role.manager && !role.admin) {
      searchQuery.role = { admin: false, manager: false };
    }

    // find tall employees based on searchQuery
    Employee.find(searchQuery)
      .then(employees => {
        res.status(200).json({ employees });
      })
      .catch(err => {
        res.status(500).json({ err, msg: 'There was an error retrieving the servers.' });
      });
  } catch (err) {
    res.status(400).json({ err, msg: 'There was an error verifying the token.' });
  }
};

module.exports = { getAllServers };
