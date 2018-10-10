import axios from 'axios';
import { push } from 'connected-react-router';
import jwtDecode from 'jwt-decode';

// URIs
import serverURI from '../../config/URI';
// Helpers
import errorHandler from '../helpers/errorHandler';

export const ADDING_RESTAURANT = 'ADDING_RESTAURANT';
export const ADDING_RESTAURANT_SUCCESS = 'ADDING_RESTAURANT_SUCCESS';
export const ADDING_RESTAURANT_ERROR = 'ADDING_RESTAURANT_ERROR';
export const RESTAURANT_AUTH = 'RESTAURANT_AUTH';
export const GETTING_TAXRATE = 'GETTING_TAXRATE';
export const GET_TAXRATE_SUCCESS = 'GET_TAXRATE_SUCCESS';
export const GET_TAXRATE_ERROR = 'GET_TAXRATE_ERROR';

export const addRestaurant = ({
  name,
  location,
}) => dispatch => {
  dispatch({ type: ADDING_RESTAURANT });
  return axios
    .post(`${serverURI}/api/restaurants/register`, { name, location: location.toString().padStart(5, '0') })
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

export const getTaxRate = () => dispatch => {
  dispatch({ type: GETTING_TAXRATE });

  return axios.get(`${serverURI}/api/restaurants/taxrate`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_TAXRATE_SUCCESS, payload: res.data.taxRate });
    })
    .catch(err => {
      dispatch({ type: GET_TAXRATE_ERROR, payload: err });
      errorHandler(err);
    })
};
