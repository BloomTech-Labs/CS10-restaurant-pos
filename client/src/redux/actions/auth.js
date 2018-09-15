import axios from 'axios';
import jwtDecode from 'jwt-decode';

// URIs

import serverURI from '../../config/URI';

export const PASSWORD_MATCH_ERROR = 'PASSWORD_MATCH_ERROR';
export const PASSWORD_MATCH_SUCCESS = 'PASSWORD_MATCH_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; // TODO: make separate action types for registration
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // TODO: make separate action types for registration
export const EMPLOYEE_LOGIN_FAILURE = 'EMPLOYEE_LOGIN_FAILURE'; // TODO: make separate action types for registration
export const EMPLOYEE_LOGIN_SUCCESS = 'EMPLOYEE_LOGIN_SUCCESS'; // TODO: make separate action types for registration
// TODO: Make loading action type LOGGING_IN for login and employeeLogin actions

// Axios Defaults

axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');

// Actions

export const login = ({ pin, pass }, push) => (
  (dispatch) => {
    axios
      .post(`${serverURI}/api/restaurants/login`, { pin, pass })
      .then((res) => {
        const { role } = jwtDecode(res.data.token);

        dispatch({ type: LOGIN_SUCCESS, jwt: res.data.token, role });

        localStorage.setItem('jwt', res.data.token);

        if (role.admin || role.manager) {
          push('/servers');
        } else {
          push('/tables');
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  }
);

export const register = ({ firstName, lastName, pin, pass, confirmPass }) => (
  (dispatch) => {
    if (pass !== confirmPass) {
      dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
      return;
    }
    dispatch({ type: PASSWORD_MATCH_SUCCESS });
    axios
      .post(`${serverURI}/api/restaurants/register`, { name: `${firstName} ${lastName}`, pin, pass })
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  }
);

export const employeeLogin = ({ pin, pass }, push) => (
  (dispatch) => { // TODO: Change action types to be unique from register/login
    axios
      .post(`${serverURI}/api/employees/login`, { pin, pass })
      .then((res) => {
        const { role } = jwtDecode(res.data.token);

        dispatch({ type: LOGIN_SUCCESS, payload: { jwt: res.data.token, role } });

        localStorage.setItem('jwt', res.data.token);

        if (role.admin || role.manager) {
          push('/servers');
        } else {
          push('/tables');
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  }
);

export const employeeRegister = ({ firstName, lastName, pin, pass, confirmPass }) => (
  (dispatch) => {
    if (pass !== confirmPass) {
      dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
      return;
    }
    dispatch({ type: PASSWORD_MATCH_SUCCESS });
    axios
      .post(`${serverURI}/api/employees/register`, { name: `${firstName} ${lastName}`, pin, pass })
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  }
);
