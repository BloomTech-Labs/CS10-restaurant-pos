const passport = require('passport');

const {
  adminRegister,
  employeeRegister,
  employeeLogin,
  adminLogin,
  updatePin,
  employeeLogout,
  getCurrentUser
} = require('../controllers/employees');

module.exports = server => {
  server.route('/api/employees/admin/register').post(adminRegister);
  server.route('/api/employees/register').post(employeeRegister);
  server.route('/api/employees/login').post(employeeLogin);
  server.route('/api/employees/admin/login').post(adminLogin);
  server.route('/api/employees/update/:pin', passport.authenticate('jwt', { session: false })).put(updatePin);
  server.route('/api/employees/logout').get(employeeLogout);
  server.route('/api/employees/current').get(getCurrentUser);
};
