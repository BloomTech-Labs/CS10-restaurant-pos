const { addTable } = require('./addTable');
const { getAllTables } = require('./getAllTables');
const { getTable } = require('./getTable');
const { updateAllTables } = require('./updateAllTables');
const { deactivateTable } = require('./deactivateTable');
const { deleteTable } = require('./deleteTable');

module.exports = {
  addTable,
  getAllTables,
  getTable,
  updateAllTables,
  deactivateTable,
  deleteTable
};
