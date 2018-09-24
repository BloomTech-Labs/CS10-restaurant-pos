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
  EMPLOYEE_REGISTER_SUCCESS,
  EMPLOYEE_REGISTER_FAILURE
} from '../actions/auth';
import { RESTAURANT_AUTH } from '../actions/restaurant';

const initialState = {
  loading: false,
  pin: '',
  jwt: false,
  role: { admin: false, manager: false },
  restaurant: '',
  membership: false
};

const AuthReducer = (auth = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_AUTH:
      const jwt = localStorage.getItem('jwt');

      let role = { admin: false, manager: false };

      let membership = false;
      let restaurant = '';

      if (jwt) {
        const currentTime = Date.now() / 1000;
        const decodedJwt = jwtDecode(jwt);

        if (decodedJwt.exp < currentTime) {
          localStorage.removeItem('jwt');
        } else {
          role = decodedJwt.role; // eslint-disable-line prefer-destructuring
          restaurant = decodedJwt.restaurant; // eslint-disable-line prefer-destructuring
          membership = decodedJwt.membership; // eslint-disable-line prefer-destructuring
        }
      }
      return { ...auth, jwt, role, membership: true, restaurant };

    case AUTH_LOADING:
      return { ...auth, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...auth,
        loading: false,
        jwt: action.payload.jwt,
        restaurant: action.payload.restaurant,
        membership: action.payload.membership
      };

    case LOGIN_FAILURE:
      return { ...auth, loading: false };

    case REGISTRATION_SUCCESS:
      return { ...auth, loading: false, pin: action.payload };

    case REGISTRATION_FAILURE:
      return { ...auth, loading: false };

    case EMPLOYEE_LOGIN_SUCCESS:
      return {
        ...auth,
        loading: false,
        jwt: action.payload.jwt,
        role: action.payload.role
      };

    case EMPLOYEE_LOGIN_FAILURE:
      return { ...auth, loading: false };

    case RESTAURANT_AUTH:
      return {
        ...auth,
        loading: false,
        jwt: action.payload.jwt,
        restaurant: action.payload.restaurant,
        membership: action.payload.membership
      };

    case EMPLOYEE_REGISTER_SUCCESS:
      return { ...auth, loading: false, pin: action.payload };

    case EMPLOYEE_REGISTER_FAILURE:
      return { ...auth, loading: false };

    default:
      return auth;
  }
};

export default AuthReducer;
