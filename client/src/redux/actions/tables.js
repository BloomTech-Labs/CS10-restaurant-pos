import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_TABLES = 'LOADING_TABLES';
export const LOADING_TABLES_SUCCESS = 'LOADING_TABLES_SUCCESS';
export const LOADING_TABLES_ERROR = 'LOADING_TABLES_ERROR';
export const MOVE_TABLE = 'MOVE_TABLE';
export const ADD_TABLE = 'ADD_TABLE';

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
        console.error(err);
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
