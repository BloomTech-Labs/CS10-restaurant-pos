import axios from 'axios';

// Axios Defaults
export const axiosAuth = () => (next) => (action) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');
  next(action);
};
