const {
  addOrder,
  getAllOrders,
  getOrder,
  updateOrder
} = require('../controllers/orders');

module.exports = (server, validation) => {
  server.route('/api/orders/add').post(validation, addOrder);
  server.route('/api/orders/all').get(validation, getAllOrders);
  server.route('/api/orders/:id').get(validation, getOrder);
  server.route('/api/orders/update/:id').put(validation, updateOrder);
};
