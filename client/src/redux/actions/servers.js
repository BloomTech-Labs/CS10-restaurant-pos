import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_SERVERS = 'LOADING_SERVERS';
export const LOADING_SERVERS_SUCCESS = 'LOADING_SERVERS_SUCCESS';
export const LOADING_SERVERS_ERROR = 'LOADING_SERVERS_ERROR';

axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');

export const getServers = () => (
  (dispatch) => {
    dispatch({ type: LOADING_SERVERS });
    axios
      .get(`${serverURI}/api/servers/all`)
      .then((res) => {
        dispatch({ type: LOADING_SERVERS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: LOADING_SERVERS_ERROR, payload: err });
      });
  }
);
