const Employee = require('../../models/Employee');
const verifyRole = require('../../validation/verifyRole');

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

  // find tall employees based on searchQuery
  Employee.find(searchQuery)
    .select(['name', 'email', 'role', 'pin'])
    .then((employees) => {
      res.status(200).json({ employees });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'There was an error retrieving the servers.' });
    });
};

module.exports = { getAllServers };
