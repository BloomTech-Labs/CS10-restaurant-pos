import axios from 'axios';
import { push } from 'connected-react-router';
import jwtDecode from 'jwt-decode';

// URIs
import serverURI from '../../config/URI';
// Helpers
import errorHandler from '../helpers/errorHandler';

export const LOADING_RESTAURANT = 'LOADING_RESTAURANT';
export const LOADING_RESTAURANT_SUCCESS = 'LOADING_RESTAURANT_SUCCESS';
export const LOADING_RESTAURANT_ERROR = 'LOADING_RESTAURANT_ERROR';
export const ADDING_RESTAURANT = 'ADDING_RESTAURANT';
export const ADDING_RESTAURANT_SUCCESS = 'ADDING_RESTAURANT_SUCCESS';
export const ADDING_RESTAURANT_ERROR = 'ADDING_RESTAURANT_ERROR';
export const RESTAURANT_AUTH = 'RESTAURANT_AUTH';

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

export const addRestaurant = ({
  name,
  location,
  billingAddress: address
}) => dispatch => {
  dispatch({ type: ADDING_RESTAURANT });
  axios
    .post(`${serverURI}/api/restaurants/register`, { name, location, billing: { address } })
    .then(res => {
      const { restaurant } = jwtDecode(res.data.token);

      dispatch({ type: RESTAURANT_AUTH, payload: { jwt: res.data.token, restaurant } });

      localStorage.setItem('jwt', res.data.token);

      dispatch(push('/login-employee'));
    })
    .catch(err => {
      dispatch({ type: ADDING_RESTAURANT_ERROR, payload: err });
      errorHandler(err);
    });
};
