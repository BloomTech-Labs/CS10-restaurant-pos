import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_PARTY = 'LOADING_PARTY';
export const LOADING_PARTY_SUCCESS = 'LOADING_PARTY_SUCCESS';
export const LOADING_PARTY_ERROR = 'LOADING_PARTY_ERROR';

axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');

export const getParty = () => (
  (dispatch) => {
    dispatch({ type: LOADING_PARTY });
    axios
      .get(`${serverURI}/api/tables/all`)
      .then((res) => {
        dispatch({ type: LOADING_PARTY_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: LOADING_PARTY_ERROR, payload: err });
      });
  }
);
