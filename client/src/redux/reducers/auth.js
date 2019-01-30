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
  },
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
      'https://storage.googleapis.com/main-course-images/man-303792_640.png',
    small:
      'https://storage.googleapis.com/main-course-images/man-303792_640.png',
    medium:
      'https://storage.googleapis.com/main-course-images/man-303792_640.png'
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
  // Returns membership=true as the default value to bypass verfication (Stripe Account is down)
  return { jwt, role, restaurant, membership: true, name, email, id, pin, images };
};

const AuthReducer = (auth = initialState, action) => {
  let themeColor;

  switch (action.type) {
    case AUTH_LOADING:
      return { ...auth, loading: true };

    case SET_INITIAL_AUTH:
      // eslint-disable-next-line no-case-declarations
      const jwt = localStorage.getItem('jwt');

      return { ...auth, ...getJWTInfo(jwt) };

    case LOGIN_SUCCESS:
      // eslint-disable-next-line prefer-destructuring
      themeColor = jwtDecode(action.payload).themeColor;
      if (themeColor && themeColor !== localStorage.getItem('themeColor')) {
        localStorage.setItem('themeColor', themeColor);
        window.location.reload();
      }
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
      // eslint-disable-next-line prefer-destructuring
      themeColor = jwtDecode(action.payload).themeColor;
      if (themeColor && themeColor !== localStorage.getItem('themeColor')) {
        localStorage.setItem('themeColor', themeColor);
        window.location.reload();
      }
      return {
        ...auth,
        ...getJWTInfo(action.payload),
        loading: false
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
