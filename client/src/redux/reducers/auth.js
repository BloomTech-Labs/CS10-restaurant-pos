import jwtDecode from 'jwt-decode';

import {
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

const jwt = localStorage.getItem('jwt');

let role = { admin: false, manager: false };
let restaurant = '';

if (jwt) {
  const currentTime = Date.now() / 1000;
  const decodedJwt = jwtDecode(jwt);

  if (decodedJwt.exp < currentTime) {
    localStorage.removeItem('jwt');
  } else {
    role = decodedJwt.role; // eslint-disable-line prefer-destructuring
    restaurant = decodedJwt.restaurant; // eslint-disable-line prefer-destructuring
  }
}

const initialState = {
  loading: false,
  pin: '',
  jwt,
  role,
  restaurant
};

const AuthReducer = (auth = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...auth, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...auth,
        loading: false,
        jwt: action.payload.jwt,
        restaurant: action.payload.restaurant,
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
        role: action.payload.role,
      };

    case EMPLOYEE_LOGIN_FAILURE:
      return { ...auth, loading: false };

    case RESTAURANT_AUTH:
      return {
        ...auth,
        loading: false,
        jwt: action.payload.jwt,
        restaurant: action.payload.restaurant,
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
