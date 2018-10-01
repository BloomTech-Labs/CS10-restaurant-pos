import axios from 'axios';
import { push } from 'connected-react-router';
import jwtDecode from 'jwt-decode';

// URIs
import serverURI from '../../config/URI';

export const AUTH_LOADING = 'AUTH_LOADING';
export const SET_INITIAL_AUTH = 'SET_INITIAL_AUTH';
export const LOGOUT = 'LOGOUT';
export const PASSWORD_MATCH_ERROR = 'PASSWORD_MATCH_ERROR';
export const PASSWORD_MATCH_SUCCESS = 'PASSWORD_MATCH_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const EMPLOYEE_LOGIN_FAILURE = 'EMPLOYEE_LOGIN_FAILURE';
export const EMPLOYEE_LOGIN_SUCCESS = 'EMPLOYEE_LOGIN_SUCCESS';
export const EMPLOYEE_LOGOUT_FAILURE = 'EMPLOYEE_LOGOUT_FAILURE';
export const EMPLOYEE_LOGOUT_SUCCESS = 'EMPLOYEE_LOGOUT_SUCCESS';
export const EMPLOYEE_REGISTER_SUCCESS = 'EMPLOYEE_REGISTER_SUCCESS';
export const EMPLOYEE_REGISTER_FAILURE = 'EMPLOYEE_REGISTER_FAILURE';

export const setInitialAuth = () => ({ type: SET_INITIAL_AUTH });

export const logout = () => ({ type: LOGOUT });

export const login = ({ email, pass }) => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(`${serverURI}/api/employees/admin/login`, { email, pass })
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });

      localStorage.setItem('jwt', res.data.token);

      if (getState().auth.restaurant) {
        dispatch(push('/login-employee'));
      } else {
        dispatch(push('/new-restaurant'));
      }
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE, payload: err });
    });
};

export const register = ({ name, email, pass, confirmPass }) => (dispatch) => {
  if (pass !== confirmPass) {
    dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
    return;
  }
  dispatch({ type: PASSWORD_MATCH_SUCCESS });
  dispatch({ type: AUTH_LOADING });
  axios
    .post(`${serverURI}/api/employees/admin/register`, {
      name,
      email,
      pass
    })
    .then((res) => {
      dispatch({ type: REGISTRATION_SUCCESS, payload: res.data.pin });
      dispatch(push('/registration-success'));
    })
    .catch((err) => {
      dispatch({ type: REGISTRATION_FAILURE, payload: err });
    });
};

export const changePassword = ({ pin, oldPassword, newPassword, confirmNew }) => (
  dispatch
) => {
  if (newPassword !== confirmNew) {
    dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
    return;
  }
  dispatch({ type: PASSWORD_MATCH_SUCCESS });
  dispatch({ type: AUTH_LOADING });
  axios
    .put(`${serverURI}/api/employees/update/${pin}`, {
      oldPassword,
      newPassword
    })
    .then(() => {
      dispatch({ type: CHANGE_PASSWORD_SUCCESS });
      dispatch(push('/password-change-success'));
    })
    .catch((err) => {
      dispatch({ type: CHANGE_PASSWORD_ERROR, payload: err });
    });
};

export const loginEmployee = ({ pin, pass }) => (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(`${serverURI}/api/employees/login`, { pin, pass })
    .then((res) => {
      const { role } = jwtDecode(res.data.token);

      dispatch({
        type: EMPLOYEE_LOGIN_SUCCESS,
        payload: res.data.token
      });

      localStorage.setItem('jwt', res.data.token);

      if (role.admin || role.manager) {
        dispatch(push('/servers'));
      } else {
        dispatch(push('/tables'));
      }
    })
    .catch((err) => {
      dispatch({ type: EMPLOYEE_LOGIN_FAILURE, payload: err });
    });
};

export const logoutEmployee = () => (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .get(`${serverURI}/api/employees/logout`)
    .then((res) => {
      dispatch({
        type: EMPLOYEE_LOGOUT_SUCCESS,
        payload: res.data.token
      });

      localStorage.setItem('jwt', res.data.token);
    })
    .catch((err) => {
      dispatch({ type: EMPLOYEE_LOGOUT_FAILURE, payload: err });
    });
};

export const addEmployee = ({ name, pass, confirmPass }) => (dispatch) => {
  if (pass !== confirmPass) {
    dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
    return;
  }
  dispatch({ type: PASSWORD_MATCH_SUCCESS });
  dispatch({ type: AUTH_LOADING });
  axios
    .post(`${serverURI}/api/employees/register`, { name, pass })
    .then((res) => {
      dispatch({ type: EMPLOYEE_REGISTER_SUCCESS, payload: res.data.pin });
      dispatch(push('/registration-success'));
    })
    .catch((err) => {
      dispatch({ type: EMPLOYEE_REGISTER_FAILURE, payload: err });
    });
};
