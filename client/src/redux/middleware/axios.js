import axios from 'axios';

// Axios Defaults
export const axiosAuth = (store) => (next) => (action) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.Authorization = store.getState().auth.jwt;
  next(action);
};
