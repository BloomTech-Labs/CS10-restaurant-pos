import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_RESTAURANT = 'LOADING_RESTAURANT';
export const LOADING_RESTAURANT_SUCCESS = 'LOADING_RESTAURANT_SUCCESS';
export const LOADING_RESTAURANT_ERROR = 'LOADING_RESTAURANT_ERROR';
export const ADDING_RESTAURANT = 'ADDING_RESTAURANT';
export const ADDING_RESTAURANT_SUCCESS = 'ADDING_RESTAURANT_SUCCESS';
export const ADDING_RESTAURANT_ERROR = 'ADDING_RESTAURANT_ERROR';

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

export const addRestaurant = (data) => dispatch => {
  dispatch({ type: ADDING_RESTAURANT });
  axios
    .post(`${serverURI}/api/restaurants/register`, data) // TODO: Verify this route
    .then(res => {
      dispatch({ type: ADDING_RESTAURANT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: ADDING_RESTAURANT_ERROR, payload: err });
    });
};
