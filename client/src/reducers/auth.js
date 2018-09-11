import { LOGIN } from '../actions';

const initialState = {
  authenticated: false,
  jwt: localStorage.getItem('jwt'),
}

const AuthReducer = (auth = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...auth, authenticated: true, user: action.payload };
    default:
      return auth;
  }
};

export default AuthReducer;
