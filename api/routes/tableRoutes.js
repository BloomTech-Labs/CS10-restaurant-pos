const {
  addTable,
  getAllTables,
  getTable,
  updateAllTables,
  deactivateTable,
  deleteTable
} = require('../controllers/tables');

module.exports = (server, validation) => {
  server.route('/api/tables/add').post(validation, addTable);
  server.route('/api/tables/all').get(validation, getAllTables);
  server.route('/api/tables/:id').get(validation, getTable);
  server.route('/api/tables/update').post(validation, updateAllTables);
  server.route('/api/tables/deactivate/:id').put(validation, deactivateTable);
  server.route('/api/tables/delete/:id').delete(validation, deleteTable);
};
