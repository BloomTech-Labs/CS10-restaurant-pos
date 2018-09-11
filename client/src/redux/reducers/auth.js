import { LOGIN_SUCCESS } from '../actions/auth';

const initialState = {
  jwt: localStorage.getItem('jwt'),
};

const AuthReducer = (auth = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...auth, user: action.payload };
    default:
      return auth;
  }
};

export default AuthReducer;
