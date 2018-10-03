/* eslint-disable no-case-declarations */

import {
  LOADING_TABLES,
  LOADING_TABLES_SUCCESS,
  ADDING_TABLE,
  ADDING_TABLE_SUCCESS,
  DELETING_TABLE,
  DELETING_TABLE_SUCCESS,
  MOVE_TABLE,
  SAVING_TABLES,
  SAVING_TABLES_SUCCESS,
  DEACTIVATING_TABLE,
  DEACTIVATING_TABLE_SUCCESS,
  TOGGLE_TABLE,
  TOGGLE_EDIT,
  CLEAR_SERVER_TABLES,
} from '../actions/tables';
import { CLEAR_SELECTED } from '../actions/party';

const initialState = {
  tableList: [],
  serverTables: [],
  selected: new Set(),
  editing: false,
  loading: false,
  sidebarRef: null,
  topbarRef: null,
};

const TablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_TABLES:
      return { ...state, loading: true };

    case LOADING_TABLES_SUCCESS:
      return {
        ...state,
        loading: false,
        tableList: action.payload.tableList,
        serverTables: action.payload.serverTables,
      };

    case ADDING_TABLE:
      return { ...state, loading: true };

    case ADDING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        tableList: [...state.tableList, action.payload],
      };

    case DELETING_TABLE:
      return { ...state, loading: true };

    case DELETING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        tableList: action.payload,
      };

    case MOVE_TABLE:
      const { x, y, tableId } = action.payload;
      return {
        ...state,
        tableList: state.tableList.map((table) => {
          if (table._id === tableId) {
            return { ...table, x, y };
          }
          return table;
        }),
      };

    case SAVING_TABLES:
      return { ...state, loading: true };

    case SAVING_TABLES_SUCCESS: // ? Do we need: `tableList: action.payload` ?
      return { ...state, loading: false };

    case DEACTIVATING_TABLE:
      return { ...state, loading: true };

    case DEACTIVATING_TABLE_SUCCESS:
      const { updatedTable } = action.payload;
      return {
        ...state,
        loading: false,
        tableList: state.tableList.map((table) => {
          if (table._id === updatedTable._id) return updatedTable;
          return table;
        }),
      };

    case TOGGLE_TABLE:
      const table = action.payload;
      const newSet = new Set(state.selected);
      if (state.selected.has(table)) {
        newSet.delete(table);
        return { ...state, selected: newSet };
      }
      return { ...state, selected: newSet.add(table) };

    case TOGGLE_EDIT:
      return { ...state, editing: !state.editing };

    case CLEAR_SELECTED:
      return { ...state, selected: new Set() };

    case CLEAR_SERVER_TABLES:
      return { ...state, serverTables: [] };

    default:
      return state;
  }
};

export default TablesReducer;
