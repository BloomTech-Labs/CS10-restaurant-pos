import axios from 'axios';

// URIs
import serverURI from '../../config/URI';
// Helpers
import errorHandler from '../helpers/errorHandler';

export const LOADING_SERVERS = 'LOADING_SERVERS';
export const LOADING_SERVERS_SUCCESS = 'LOADING_SERVERS_SUCCESS';
export const LOADING_SERVERS_ERROR = 'LOADING_SERVERS_ERROR';

export const getServers = () => (
  (dispatch) => {
    dispatch({ type: LOADING_SERVERS });
    axios
      .get(`${serverURI}/api/employees/all`)
      .then((res) => {
        dispatch({ type: LOADING_SERVERS_SUCCESS, payload: res.data.employees });
      })
      .catch((err) => {
        dispatch({ type: LOADING_SERVERS_ERROR, payload: err });
        errorHandler(err);
      });
  }
);
