export const getRoleString = (role, loggedIn) => {
  if (role.admin) {
    return 'Admin';
  }
  if (role.manager) {
    return 'Manager';
  }
  if (loggedIn) {
    return 'Server';
  }
  return 'ERROR';
};
