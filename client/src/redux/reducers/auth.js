import jwtDecode from 'jwt-decode';

import {
  AUTH_LOADING,
  LOGIN_SUCCESS,
  REGISTRATION_SUCCESS,
  EMPLOYEE_LOGIN_SUCCESS
} from '../actions/auth';

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
        restaurant: action.payload.restaurant
      };

    case REGISTRATION_SUCCESS:
      return { ...auth, loading: false, pin: action.payload };

    case EMPLOYEE_LOGIN_SUCCESS:
      return {
        ...auth,
        loading: false,
        jwt: action.payload.jwt,
        role: action.payload.role
      };

    default:
      return auth;
  }
};

export default AuthReducer;
