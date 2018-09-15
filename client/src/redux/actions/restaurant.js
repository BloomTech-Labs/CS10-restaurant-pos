import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_RESTAURANT = 'LOADING_RESTAURANT';
export const LOADING_RESTAURANT_SUCCESS = 'LOADING_RESTAURANT_SUCCESS';
export const LOADING_RESTAURANT_ERROR = 'LOADING_RESTAURANT_ERROR';

axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');

export const getRestaurant = () => dispatch => {
  dispatch({ type: LOADING_RESTAURANT });
  axios
    .get(`${serverURI}/api/restaurant/all`) // TODO: Verify this route
    .then(res => {
      dispatch({ type: LOADING_RESTAURANT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: LOADING_RESTAURANT_ERROR, payload: err });
    });
};
