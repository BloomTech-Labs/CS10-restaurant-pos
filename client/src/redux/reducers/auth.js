import jwtDecode from 'jwt-decode';

import { LOGIN_SUCCESS } from '../actions/auth';

const jwt = localStorage.getItem('jwt');

let role = { admin: false, manager: false };

if (jwt) {
  const { role: userRole } = jwtDecode(jwt);
  role = userRole;
}

const initialState = {
  jwt,
  role,
};

const AuthReducer = (auth = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...auth, jwt: action.payload };
    default:
      return auth;
  }
};

export default AuthReducer;
