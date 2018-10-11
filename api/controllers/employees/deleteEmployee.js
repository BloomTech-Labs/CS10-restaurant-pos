const Employee = require('../../models/Employee');
const Party = require('../../models/Party');

// @route   POST api/orders/delete
// @desc    Delete a order
// @access  Private
const deleteEmployee = (req, res) => {
  const { id } = req.params;

  if (!req.user.role.admin) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }

  console.log(id);

  Party.find({ server: id })
    .then((parties) => {
      if (parties.length > 0) {
        return res.status(400).json({
          msg: 'The server has active tables and could not be removed.'
        });
      }

      Employee.findOneAndRemove({ _id: id })
        .then((removedEmployee) => {
          if (!removedEmployee) {
            return res
              .status(404)
              .json({ msg: 'The employee with the specified ID does not exist.' });
          }
          res.status(202).json({
            msg: `${removedEmployee.name} was removed from the database.`
          });
        })
        .catch((err) => {
          res.status(500).json({ err, msg: 'Error deleting the employee from the database.' });
        });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: 'There was an error communicating with the database.' });
    });
};

module.exports = { deleteEmployee };
