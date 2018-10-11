import axios from 'axios';
import { push } from 'connected-react-router';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

// URIs
import serverURI from '../../config/URI';
// Helpers
import errorHandler from '../helpers/errorHandler';

export const AUTH_LOADING = 'AUTH_LOADING';
export const SET_INITIAL_AUTH = 'SET_INITIAL_AUTH';
export const LOGOUT = 'LOGOUT';
export const PASSWORD_MATCH_ERROR = 'PASSWORD_MATCH_ERROR';
export const PASSWORD_MATCH_SUCCESS = 'PASSWORD_MATCH_SUCCESS';
export const UPDATE_EMPLOYEE_ERROR = 'UPDATE_EMPLOYEE_ERROR';
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';
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
export const CHANGING_EMPLOYEE_ROLE = 'CHANGING_EMPLOYEE_ROLE';
export const CHANGE_EMPLOYEE_ROLE_SUCCESS = 'CHANGE_EMPLOYEE_ROLE_SUCCESS';
export const CHANGE_EMPLOYEE_ROLE_FAILURE = 'CHANGE_EMPLOYEE_ROLE_FAILURE';
export const DELETING_EMPLOYEE = 'DELETING_EMPLOYEE';
export const DELETING_EMPLOYEE_SUCCESS = 'DELETING_EMPLOYEE_SUCCESS';
export const DELETING_EMPLOYEE_FAILURE = 'DELETING_EMPLOYEE_FAILURE';

export const setInitialAuth = () => ({ type: SET_INITIAL_AUTH });

export const logout = () => ({ type: LOGOUT });

export const login = ({ email, pass }) => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });
  return axios
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
      errorHandler(err);
    });
};

export const register = ({ name, email, pass, confirmPass, images }) => (dispatch) => {
  if (pass !== confirmPass) {
    dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
    return;
  }

  dispatch({ type: PASSWORD_MATCH_SUCCESS });
  dispatch({ type: AUTH_LOADING });

  const randomNum = Math.round(Math.random() * 1000 + 10);
  if (!Object.keys(images).length) {
    images = {
      thumbnail: `https://picsum.photos/55/55?image=${randomNum}`,
      small: `https://picsum.photos/110/110?image=${randomNum}`,
      medium: `https://picsum.photos/200/200?image=${randomNum}`
    };
  }

  return axios
    .post(`${serverURI}/api/employees/admin/register`, {
      name,
      email,
      pass,
      images
    })
    .then((res) => {
      dispatch({ type: REGISTRATION_SUCCESS, payload: res.data.pin });
      dispatch(push('/registration-success'));
    })
    .catch((err) => {
      dispatch({ type: REGISTRATION_FAILURE, payload: err });
      errorHandler(err);
    });
};

export const updateEmployee = ({ pin, pass, newPass, confirmNew, email, name, themeColor }) => (
  dispatch
) => {
  if (newPass !== confirmNew) {
    dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
    return;
  }
  dispatch({ type: PASSWORD_MATCH_SUCCESS });
  dispatch({ type: AUTH_LOADING });
  return axios
    .put(`${serverURI}/api/employees/update/${pin}`, {
      pass,
      newPass,
      name,
      email,
      themeColor
    })
    .then(() => {
      dispatch({ type: UPDATE_EMPLOYEE_SUCCESS });
      toast('Successfully updated the account.');
      if (themeColor) window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: UPDATE_EMPLOYEE_ERROR, payload: err });
      errorHandler(err);
    });
};

export const loginEmployee = ({ pin, pass }) => (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  return axios
    .post(`${serverURI}/api/employees/login`, { pin: pin.toString().padStart(4, '0'), pass })
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
      errorHandler(err);
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
      dispatch(push('/login-employee'));

      localStorage.setItem('jwt', res.data.token);
    })
    .catch((err) => {
      dispatch({ type: EMPLOYEE_LOGOUT_FAILURE, payload: err });
      errorHandler(err);
    });
};

export const addEmployee = (employee) => (dispatch) => {
  if (employee.pass !== employee.confirmPass) {
    dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
    return;
  }

  dispatch({ type: PASSWORD_MATCH_SUCCESS });
  dispatch({ type: AUTH_LOADING });

  let { images } = employee;
  const randomNum = Math.round(Math.random() * 1000 + 10);
  if (!Object.keys(images).length) {
    images = {
      thumbnail: `https://picsum.photos/55/55?image=${randomNum}`,
      small: `https://picsum.photos/110/110?image=${randomNum}`,
      medium: `https://picsum.photos/200/200?image=${randomNum}`
    };
  }

  return axios
    .post(`${serverURI}/api/employees/register`, {
      name: employee.name,
      pass: employee.pass,
      email: employee.email,
      images
    })
    .then((res) => {
      dispatch({ type: EMPLOYEE_REGISTER_SUCCESS, payload: res.data.pin });
      dispatch(push('/registration-success'));
    })
    .catch((err) => {
      dispatch({ type: EMPLOYEE_REGISTER_FAILURE, payload: err });
      errorHandler(err);
    });
};

export const changeEmployeeRole = (id, role) => (dispatch) => {
  dispatch({ type: CHANGING_EMPLOYEE_ROLE });
  return axios
    .put(`${serverURI}/api/employees/update/role/${id}`, { role })
    .then(() => {
      dispatch({ type: CHANGE_EMPLOYEE_ROLE_SUCCESS });
      toast('Successfully Updated Employees Role');
    })
    .catch((err) => {
      dispatch({ type: CHANGE_EMPLOYEE_ROLE_FAILURE, payload: err });
      errorHandler(err);
    });
};

export const deleteEmployee = (id) => (dispatch) => {
  dispatch({ type: DELETING_EMPLOYEE });
  return axios
    .delete(`${serverURI}/api/employees/delete/${id}`)
    .then((res) => {
      dispatch({ type: DELETING_EMPLOYEE_SUCCESS });
      toast(res.data.msg);
    })
    .catch((err) => {
      dispatch({ type: DELETING_EMPLOYEE_FAILURE, payload: err });
      errorHandler(err);
    });
};
