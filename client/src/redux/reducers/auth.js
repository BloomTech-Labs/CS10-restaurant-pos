import jwtDecode from 'jwt-decode';

import { LOGIN_SUCCESS } from '../actions/auth';

const jwt = localStorage.getItem('jwt');

let role = { admin: false, manager: false };

if (jwt) {
  const currentTime = Date.now() / 1000;
  const decodedJwt = jwtDecode(jwt);

  if (decodedJwt.exp < currentTime) {
    localStorage.removeItem('jwt');
  } else {
    role = decodedJwt.role; // eslint-disable-line prefer-destructuring
  }
}

const initialState = {
  jwt,
  role,
};

const AuthReducer = (auth = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...auth, jwt: action.payload.jwt, role: action.payload.role };

    default:
      return auth;
  }
};

export default AuthReducer;
