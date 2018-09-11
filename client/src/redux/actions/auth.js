import axios from 'axios';

// URIs

import serverURI from '../../config/URI';

export const PASSWORD_MATCH_ERROR = 'PASSWORD_MATCH_ERROR';
export const PASSWORD_MATCH_SUCCESS = 'PASSWORD_MATCH_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// Axios Defaults

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('jwt');

// Actions

export const login = ({ pin, pass }, push) => {
  return (dispatch) => {
    axios
      .post(`${serverURI}/login`, { pin, pass })
      .then((res) => {
        // TODO: Finish this --------------------
        const role = 'get the role from the jwt';
        // TODO: Finish this --------------------
        dispatch({ type: LOGIN_SUCCESS, jwt: res.data, role });

        if (role.admin || role.manager) {
          push('/servers');
        } else {
          push('/tables');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const register = ({ firstName, lastName, pin, pass, confirmPass }) => {
  return (dispatch) => {
    if (pass !== confirmPass) {
      dispatch({ type: PASSWORD_MATCH_ERROR, payload: 'Passwords must match' });
      return;
    }
    dispatch({ type: PASSWORD_MATCH_SUCCESS });
    axios
      .post(`${serverURI}/login`, { name: firstName + lastName, pin, pass })
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  };
};
