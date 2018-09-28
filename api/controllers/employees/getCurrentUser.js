// @route   GET server/employees/current
// @desc    Return current employee
// @access  Private
const getCurrentUser = (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    pin: req.user.pin,
    role: req.user.role,
  });
};

module.exports = { getCurrentUser };
