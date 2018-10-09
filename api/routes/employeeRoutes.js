const {
  adminRegister,
  employeeRegister,
  employeeLogin,
  adminLogin,
  updateEmployee,
  employeeLogout,
  getCurrentUser,
  getAllServers,
  changeRole,
  deleteEmployee
} = require('../controllers/employees');

module.exports = (server, validation) => {
  server.route('/api/employees/admin/register').post(adminRegister);
  server.route('/api/employees/admin/login').post(adminLogin);
  server.route('/api/employees/register').post(employeeRegister);
  server.route('/api/employees/login').post(employeeLogin);
  server.route('/api/employees/update/role/:id').put(validation, changeRole);
  server.route('/api/employees/update/:pin').put(validation, updateEmployee);
  server.route('/api/employees/logout').get(employeeLogout);
  server.route('/api/employees/current').get(validation, getCurrentUser);
  server.route('/api/employees/all').get(validation, getAllServers);
  server.route('/api/employees/delete/:id').delete(validation, deleteEmployee);
};
