import axios from 'axios';
import jwtDecode from 'jwt-decode';

// URIs

import serverURI from '../../config/URI';

export const PASSWORD_MATCH_ERROR = 'PASSWORD_MATCH_ERROR';
export const PASSWORD_MATCH_SUCCESS = 'PASSWORD_MATCH_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// Axios Defaults

axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');

// Actions

export const login = ({ pin, pass }, push) => (
  (dispatch) => {
    axios
      .post(`${serverURI}/api/employees/login`, { pin, pass })
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
      .post(`${serverURI}/api/employees/register`, { name: `${firstName} ${lastName}`, pin, pass })
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  }
);
