const {
  adminRegister,
  employeeRegister,
  employeeLogin,
  adminLogin,
  updatePin,
  employeeLogout,
  getCurrentUser,
  getAllServers
} = require('../controllers/employees');

module.exports = (server, validation) => {
  server.route('/api/employees/admin/register').post(adminRegister);
  server.route('/api/employees/register').post(employeeRegister);
  server.route('/api/employees/login').post(employeeLogin);
  server.route('/api/employees/admin/login').post(adminLogin);
  server.route('/api/employees/update/:pin').put(validation, updatePin);
  server.route('/api/employees/logout').get(employeeLogout);
  server.route('/api/employees/current').get(getCurrentUser);
  server.route('/api/employees/all').get(validation, getAllServers);
};
