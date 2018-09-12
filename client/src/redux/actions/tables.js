import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_TABLES = 'LOADING_TABLES';
export const LOADING_TABLES_SUCCESS = 'LOADING_TABLES_SUCCESS';
export const LOADING_TABLES_ERROR = 'LOADING_TABLES_ERROR';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');

export const getTables = () => {
  return (dispatch) => {
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
  };
}