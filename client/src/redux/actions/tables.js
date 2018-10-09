import axios from 'axios';
import { toast } from 'react-toastify';

// URIs
import serverURI from '../../config/URI';
// Helpers
import errorHandler from '../helpers/errorHandler';

import { getParties } from './party';

export const LOADING_TABLES = 'LOADING_TABLES';
export const LOADING_TABLES_SUCCESS = 'LOADING_TABLES_SUCCESS';
export const LOADING_TABLES_ERROR = 'LOADING_TABLES_ERROR';
export const MOVE_TABLE = 'MOVE_TABLE';
export const ADDING_TABLE = 'ADDING_TABLE';
export const ADDING_TABLE_SUCCESS = 'ADDING_TABLE_SUCCESS';
export const ADDING_TABLE_ERROR = 'ADDING_TABLE_ERROR';
export const DELETING_TABLE = 'DELETING_TABLE';
export const DELETING_TABLE_SUCCESS = 'DELETING_TABLE_SUCCESS';
export const DELETING_TABLE_ERROR = 'DELETING_TABLE_ERROR';
export const SAVING_TABLES = 'SAVING_TABLES';
export const SAVING_TABLES_SUCCESS = 'SAVING_TABLES_SUCCESS';
export const SAVING_TABLES_ERROR = 'SAVING_TABLES_ERROR';
export const DEACTIVATING_TABLE = 'DEACTIVATING_TABLE';
export const DEACTIVATING_TABLE_SUCCESS = 'DEACTIVATING_TABLE_SUCCESS';
export const DEACTIVATING_TABLE_ERROR = 'DEACTIVATING_TABLE_ERROR';
export const TOGGLE_TABLE = 'TOGGLE_TABLE';
export const TOGGLE_EDIT = 'TOGGLE_EDIT';
export const CLEAR_SERVER_TABLES = 'CLEAR_SERVER_TABLES';

export const getTables = (id) => (dispatch) => {
  dispatch({ type: LOADING_TABLES });
  axios
    .get(`${serverURI}/api/tables/all?server=${id}`)
    .then((res) => {
      dispatch({
        type: LOADING_TABLES_SUCCESS,
        payload: { tableList: res.data.tables, serverTables: res.data.serverTables }
      });
    })
    .catch((err) => {
      dispatch({ type: LOADING_TABLES_ERROR, payload: err });
      errorHandler(err);
    });
};

export const addTable = (number) => (dispatch, getState) => {
  dispatch({ type: ADDING_TABLE });

  const table = { number, x: 50, y: 50 };

  if (!getState().auth.membership) table.x = table.number * 100;

  axios
    .post(`${serverURI}/api/tables/add`, table)
    .then((res) => {
      dispatch({ type: ADDING_TABLE_SUCCESS, payload: res.data.table });
    })
    .catch((err) => {
      dispatch({ type: ADDING_TABLE_ERROR, payload: err });
      errorHandler(err);
    });
};

export const deleteTable = (table) => (dispatch) => {
  dispatch({ type: DELETING_TABLE });
  axios
    .delete(`${serverURI}/api/tables/delete/${table._id}`)
    .then((res) => {
      dispatch(getParties());
      return res;
    })
    .then((res) => {
      dispatch({ type: DELETING_TABLE_SUCCESS, payload: res.data.tables });
      toast(`Successfully deleted table number ${table.number}`);
    })
    .catch((err) => {
      dispatch({ type: DELETING_TABLE_ERROR, payload: err });
      errorHandler(err);
    });
};

export const moveTable = (table) => ({
  type: MOVE_TABLE,
  payload: table
});

export const saveTables = (tables) => (dispatch) => {
  dispatch({ type: SAVING_TABLES });
  axios
    .post(`${serverURI}/api/tables/update`, { tables })
    .then(() => {
      // res.data.tables is unneeded but contains the updated tables array
      dispatch({ type: SAVING_TABLES_SUCCESS });
      toast('Successfully saved the tables.');
    })
    .catch((err) => {
      dispatch({ type: SAVING_TABLES_ERROR, payload: err });
      errorHandler(err);
    });
};

export const deactivateTable = (id) => (dispatch) => {
  dispatch({ type: DEACTIVATING_TABLE });
  axios
    .put(`${serverURI}/api/tables/deactivate/${id}`)
    .then((res) => {
      dispatch({ type: DEACTIVATING_TABLE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: DEACTIVATING_TABLE_ERROR, payload: err });
      errorHandler(err);
    });
};

export const toggleTable = (table) => ({
  type: TOGGLE_TABLE,
  payload: table
});

export const toggleEdit = () => ({
  type: TOGGLE_EDIT
});

export const clearServerTables = () => (dispatch) => {
  // dispatch(push('/tables'));
  dispatch({
    type: CLEAR_SERVER_TABLES
  });
};
