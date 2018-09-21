const {
  addParty,
  deleteParty,
  getAllParties,
  getParty,
  updateParty
} = require('../controllers/parties');

module.exports = (server, validation) => {
  server.route('/api/party/add').post(validation, addParty);
  server.route('/api/party/delete/:id').delete(validation, deleteParty);
  server.route('/api/party/all').get(validation, getAllParties);
  server.route('/api/party/:id').get(validation, getParty);
  server.route('/api/party/update/:id').put(validation, updateParty);
};
