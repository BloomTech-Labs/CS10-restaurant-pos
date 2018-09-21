// @route   GET server/employees/current
// @desc    Return current employee
// @access  Private
const getCurrentUser = (req, res) => {
  res.json({
    id: req.user.id,
    pin: req.user.pin,
    role: req.user.role
  });
};

module.exports = { getCurrentUser };
