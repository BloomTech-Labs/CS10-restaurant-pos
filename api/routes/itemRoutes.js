const {
  addItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem
} = require('../controllers/items');

module.exports = (server, validation) => {
  server.route('/api/items/add').post(validation, addItem);
  server.route('/api/items/all').get(validation, getAllItems);
  server.route('/api/items/:id').get(validation, getItem);
  server.route('/api/items/update/:id').put(validation, updateItem);
  server.route('/api/items/delete/:id').delete(validation, deleteItem);
};
