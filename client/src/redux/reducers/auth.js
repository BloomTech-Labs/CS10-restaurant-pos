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
  pin: ''
};

const getJWTInfo = (jwt) => {
  let role = { admin: false, manager: false };
  let membership = false; // eslint-disable-line
  let restaurant = '';
  let name = '';
  let email = '';
  let id = '';
  let pin = '';

  if (jwt) {
    const currentTime = Date.now() / 1000;
    const decodedJwt = jwtDecode(jwt);

    if (decodedJwt.exp < currentTime) {
      localStorage.removeItem('jwt');
    } else {
      role = decodedJwt.role; // eslint-disable-line prefer-destructuring
      restaurant = decodedJwt.restaurant; // eslint-disable-line prefer-destructuring
      membership = decodedJwt.membership; // eslint-disable-line prefer-destructuring
      name = decodedJwt.name; // eslint-disable-line prefer-destructuring
      email = decodedJwt.email; // eslint-disable-line prefer-destructuring
      id = decodedJwt.id; // eslint-disable-line prefer-destructuring
      pin = decodedJwt.pin; // eslint-disable-line prefer-destructuring
    }
  }
  return { jwt, role, restaurant, membership, name, email, id, pin };
};

const AuthReducer = (auth = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...auth, loading: true };

    case SET_INITIAL_AUTH:
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
