const { adminRegister } = require('./adminRegister');
const { employeeRegister } = require('./employeeRegister');
const { employeeLogin } = require('./employeeLogin');
const { adminLogin } = require('./adminLogin');
const { updatePin } = require('./updatePin');
const { employeeLogout } = require('./employeeLogout');
const { getCurrentUser } = require('./getCurrentUser');

module.exports = {
  adminRegister,
  employeeRegister,
  employeeLogin,
  adminLogin,
  updatePin,
  employeeLogout,
  getCurrentUser
};
