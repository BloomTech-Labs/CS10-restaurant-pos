/* eslint-disable no-case-declarations */

import jwtDecode from 'jwt-decode';

import {
  SET_INITIAL_AUTH,
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_FAILURE,
  EMPLOYEE_LOGOUT_SUCCESS,
  EMPLOYEE_LOGOUT_FAILURE,
  EMPLOYEE_REGISTER_SUCCESS,
  EMPLOYEE_REGISTER_FAILURE,
  UPDATE_EMPLOYEE_SUCCESS
} from '../actions/auth';
import { RESTAURANT_AUTH } from '../actions/restaurant';
import { SUBSCRIBING_SUCCESS, UNSUBSCRIBING_SUCCESS } from '../actions/payments';

const initialState = {
  loading: false,
  jwt: false,
  role: { admin: false, manager: false },
  restaurant: '',
  membership: false,
  name: '',
  email: '',
  id: '',
  pin: '',
  images: {
    thumbnail: '',
    small: '',
    medium: ''
  }
};

const getJWTInfo = (jwt) => {
  let role = { admin: false, manager: false };
  let membership = false; // eslint-disable-line
  let restaurant = '';
  let name = '';
  let email = '';
  let id = '';
  let pin = '';
  let images = {
    thumbnail:
      'https://images.unsplash.com/photo-1500649297466-74794c70acfc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce5cca94a31b3b2c59c9ff1002079ed9&auto=format&fit=crop&w=10&q=60',
    small:
      'https://images.unsplash.com/photo-1500649297466-74794c70acfc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce5cca94a31b3b2c59c9ff1002079ed9&auto=format&fit=crop&w=80&q=60',
    medium:
      'https://images.unsplash.com/photo-1500649297466-74794c70acfc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce5cca94a31b3b2c59c9ff1002079ed9&auto=format&fit=crop&w=150&q=60'
  };

  if (jwt) {
    const currentTime = Date.now() / 1000;
    const decodedJwt = jwtDecode(jwt);

    if (decodedJwt.exp < currentTime) {
      localStorage.removeItem('jwt');
    } else {
      /* eslint-disable prefer-destructuring */
      role = decodedJwt.role;
      restaurant = decodedJwt.restaurant;
      membership = decodedJwt.membership;
      name = decodedJwt.name;
      email = decodedJwt.email;
      id = decodedJwt.id;
      pin = decodedJwt.pin;
      if (decodedJwt.images && Object.keys(decodedJwt.images).length) images = decodedJwt.images;
      /* eslint-enable */
    }
  }
  return { jwt, role, restaurant, membership, name, email, id, pin, images };
};

const AuthReducer = (auth = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...auth, loading: true };

    case SET_INITIAL_AUTH:
      // eslint-disable-next-line no-case-declarations
      const jwt = localStorage.getItem('jwt');

      return { ...auth, ...getJWTInfo(jwt) };

    case LOGIN_SUCCESS:
      return {
        ...auth,
        ...getJWTInfo(action.payload),
        loading: false
      };

    case LOGIN_FAILURE:
      return { ...auth, loading: false };

    case UPDATE_EMPLOYEE_SUCCESS:
      return { ...auth, loading: false };

    case REGISTRATION_SUCCESS:
      return { ...auth, loading: false, pin: action.payload };

    case REGISTRATION_FAILURE:
      return { ...auth, loading: false };

    case EMPLOYEE_LOGIN_SUCCESS:
      return {
        ...auth,
        loading: false,
        ...getJWTInfo(action.payload)
      };

    case EMPLOYEE_LOGIN_FAILURE:
      return { ...auth, loading: false };

    case EMPLOYEE_LOGOUT_SUCCESS:
      return {
        ...auth,
        loading: false,
        ...getJWTInfo(action.payload)
      };

    case EMPLOYEE_LOGOUT_FAILURE:
      return { ...auth, loading: false };

    case RESTAURANT_AUTH:
      return {
        ...auth,
        ...getJWTInfo(action.payload.jwt),
        loading: false
      };

    case EMPLOYEE_REGISTER_SUCCESS:
      return { ...auth, loading: false, pin: action.payload };

    case EMPLOYEE_REGISTER_FAILURE:
      return { ...auth, loading: false };

    case SUBSCRIBING_SUCCESS:
      return { ...auth, jwt: action.payload };

    case UNSUBSCRIBING_SUCCESS:
      return { ...auth };

    default:
      return auth;
  }
};

export default AuthReducer;
