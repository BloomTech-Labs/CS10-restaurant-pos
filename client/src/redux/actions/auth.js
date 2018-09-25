import axios from 'axios';
import jwtDecode from 'jwt-decode';

// URIs
import serverURI from '../../config/URI';

export const SET_INITIAL_AUTH = 'SET_INITIAL_AUTH';
export const LOGOUT = 'LOGOUT';
export const AUTH_LOADING = 'AUTH_LOADING';
export const PASSWORD_MATCH_ERROR = 'PASSWORD_MATCH_ERROR';
export const PASSWORD_MATCH_SUCCESS = 'PASSWORD_MATCH_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const EMPLOYEE_LOGIN_FAILURE = 'EMPLOYEE_LOGIN_FAILURE';
export const EMPLOYEE_LOGIN_SUCCESS = 'EMPLOYEE_LOGIN_SUCCESS';
export const EMPLOYEE_REGISTER_SUCCESS = 'EMPLOYEE_REGISTER_SUCCESS';
export const EMPLOYEE_REGISTER_FAILURE = 'EMPLOYEE_REGISTER_FAILURE';

export const setInitialAuth = () => ({ type: SET_INITIAL_AUTH });

export const logout = () => ({ type: LOGOUT });

export const login = ({ email, pass }, push) => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });
  axios // TODO: Determine the name of this route
    .post(`${serverURI}/api/employees/admin/login`, { email, pass })
    .then((res) => {
      const { restaurant, id } = jwtDecode(res.data.token);

      // * res.data.token:
      // const payload = {
      //   id: user._id,
      //   pin: null,
      //   role: {
      //     admin: null,
      //     manager: null
      //   },
      //   restaurant: user.restaurant
      // };

      dispatch({ type: LOGIN_SUCCESS, payload: { jwt: res.data.token, restaurant, id } });

      localStorage.setItem('jwt', res.data.token);

      if (getState().auth.restaurant) {
        push('/login-employee');
      } else {
        push('/new-restaurant');
      }
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE, payload: err });
    });
};

export const register = ({ firstName, lastName, email, pass, confirmPass }, push) => (dispatch) => {
  if (pass !== confirmPass) {
    dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
    return;
  }
  dispatch({ type: PASSWORD_MATCH_SUCCESS });
  dispatch({ type: AUTH_LOADING });
  axios
    .post(`${serverURI}/api/employees/admin/register`, {
      name: `${firstName} ${lastName}`,
      email,
      pass
    })
    .then((res) => {
      dispatch({ type: REGISTRATION_SUCCESS, payload: res.data.pin });
      push('/success');
    })
    .catch((err) => {
      dispatch({ type: REGISTRATION_FAILURE, payload: err });
    });
};

export const loginEmployee = ({ pin, pass }, push) => (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(`${serverURI}/api/employees/login`, { pin, pass })
    .then((res) => {
      const { role, restaurant } = jwtDecode(res.data.token);
      console.log({ role, restaurant, jwt: jwtDecode(res.data.token) });

      dispatch({
        type: EMPLOYEE_LOGIN_SUCCESS,
        payload: { jwt: res.data.token, role, restaurant }
      });

      localStorage.setItem('jwt', res.data.token);

      if (role.admin || role.manager) {
        push('/servers');
      } else {
        push('/tables');
      }
    })
    .catch((err) => {
      dispatch({ type: EMPLOYEE_LOGIN_FAILURE, payload: err });
    });
};

export const addEmployee = ({ firstName, lastName, pass, confirmPass }, push) => (dispatch) => {
  if (pass !== confirmPass) {
    dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
    return;
  }
  dispatch({ type: PASSWORD_MATCH_SUCCESS });
  dispatch({ type: AUTH_LOADING });
  axios
    .post(`${serverURI}/api/employees/register`, { name: `${firstName} ${lastName}`, pass })
    .then((res) => {
      dispatch({ type: EMPLOYEE_REGISTER_SUCCESS, payload: res.data.pin });
      push('/success');
    })
    .catch((err) => {
      dispatch({ type: EMPLOYEE_REGISTER_FAILURE, payload: err });
    });
};
