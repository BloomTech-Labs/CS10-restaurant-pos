import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_TABLES = 'LOADING_TABLES';
export const LOADING_TABLES_SUCCESS = 'LOADING_TABLES_SUCCESS';
export const LOADING_TABLES_ERROR = 'LOADING_TABLES_ERROR';
export const MOVE_TABLE = 'MOVE_TABLE';
export const ADDING_TABLE = 'ADDING_TABLE';
export const ADDING_TABLE_SUCCESS = 'ADDING_TABLE_SUCCESS';
export const ADDING_TABLE_ERROR = 'ADDING_TABLE_ERROR';
export const SAVING_TABLES = 'SAVING_TABLES';
export const SAVING_TABLES_SUCCESS = 'SAVING_TABLES_SUCCESS';
export const SAVING_TABLES_ERROR = 'SAVING_TABLES_ERROR';
export const DEACTIVATING_TABLE = 'DEACTIVATING_TABLE';
export const DEACTIVATING_TABLE_SUCCESS = 'DEACTIVATING_TABLE_SUCCESS';
export const DEACTIVATING_TABLE_ERROR = 'DEACTIVATING_TABLE_ERROR';

axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');

export const getTables = () => (dispatch) => {
  dispatch({ type: LOADING_TABLES });
  axios
    .get(`${serverURI}/api/tables/all`)
    .then((res) => {
      dispatch({ type: LOADING_TABLES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: LOADING_TABLES_ERROR, payload: err });
    });
};

export const addTable = () => (dispatch) => {
  dispatch({ type: ADDING_TABLE });
  axios
    .post(`${serverURI}/api/tables/add`, { x: 50, y: 50 })
    .then((res) => {
      dispatch({ type: ADDING_TABLE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: ADDING_TABLE_ERROR, payload: err });
    });
};

export const moveTable = (tables) => ({
  type: MOVE_TABLE,
  payload: tables
});

export const saveTables = (tables) => (dispatch) => {
  dispatch({ type: SAVING_TABLES });
  axios
    .post(`${serverURI}/api/tables/add`, { tables })
    .then((res) => { // ? Do we need to bother with `payload: res.data`?
      dispatch({ type: SAVING_TABLES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SAVING_TABLES_ERROR, payload: err });
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
    });
};
