import { LOGIN } from '../actions';

const initialState = {
  authenticated: false,
  user: undefined,
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