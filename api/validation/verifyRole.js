// Verifies that the user is an administrator or a manager

const verifyRole = (user, res) => {
  /* user comes from the `req`
  Does a check and if the check fails it sends the user an error message and exits the operation. */
  if (!user.role.admin && !user.role.manager) {
    return res.status(401).json({ msg: 'You are not authorized to do this.' });
  }
};

module.exports = verifyRole;
