import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_TABLES = 'LOADING_TABLES';
export const LOADING_TABLES_SUCCESS = 'LOADING_TABLES_SUCCESS';
export const LOADING_TABLES_ERROR = 'LOADING_TABLES_ERROR';
export const MOVE_TABLE = 'MOVE_TABLE';
export const ADD_TABLE = 'ADD_TABLE';
export const SAVING_TABLES = 'SAVING_TABLES';
export const SAVING_TABLES_SUCCESS = 'SAVING_TABLES_SUCCESS';
export const SAVING_TABLES_ERROR = 'SAVING_TABLES_ERROR';

axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');

export const getTables = () => (
  (dispatch) => {
    dispatch({ type: LOADING_TABLES });
    axios
      .get(`${serverURI}/api/tables/all`)
      .then((res) => {
        dispatch({ type: LOADING_TABLES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: LOADING_TABLES_ERROR, payload: err });
      });
  }
);

export const addTable = () => ({
  type: ADD_TABLE,
  payload: {
    active: false,
    x: 50,
    y: 50
  }
});

export const moveTable = (tables) => ({
  type: MOVE_TABLE,
  payload: tables
});

export const saveTables = (tables) => (
  (dispatch) => {
    dispatch({ type: SAVING_TABLES });
    axios
      .post(`${serverURI}/api/tables/add`, tables)
      .then((res) => {
        dispatch({ type: SAVING_TABLES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: SAVING_TABLES_ERROR, payload: err });
      });
  }
);
