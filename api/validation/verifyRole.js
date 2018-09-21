// Verifies that the user is an administrator or a manager

const verifyRole = (user) => {
  /* user comes from the `req`
  Does a check and if the check fails it returns false. */
  if (!user.role.admin && !user.role.manager) {
    return false;
  }
  return true;
};

module.exports = verifyRole;
