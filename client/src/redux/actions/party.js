import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_PARTIES = 'LOADING_PARTIES';
export const LOADING_PARTIES_SUCCESS = 'LOADING_PARTIES_SUCCESS';
export const LOADING_PARTIES_ERROR = 'LOADING_PARTIES_ERROR';
export const LOADING_PARTY = 'LOADING_PARTY';
export const LOADING_PARTY_SUCCESS = 'LOADING_PARTY_SUCCESS';
export const LOADING_PARTY_ERROR = 'LOADING_PARTY_ERROR';

axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');

export const getParties = () => (dispatch) => {
  dispatch({ type: LOADING_PARTIES });
  axios
    .get(`${serverURI}/api/party/all`)
    .then((res) => {
      dispatch({ type: LOADING_PARTIES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: LOADING_PARTIES_ERROR, payload: err });
    });
};

export const getParty = (id) => (dispatch) => {
  dispatch({ type: LOADING_PARTY });
  axios
    .get(`${serverURI}/api/party/${id}`)
    .then((res) => {
      dispatch({ type: LOADING_PARTY_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: LOADING_PARTY_ERROR, payload: err });
    });
};
