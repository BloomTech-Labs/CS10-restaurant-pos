import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';

// Axios Defaults
export const axiosAuth = () => (next) => (action) => {
  loadProgressBar();
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');
  next(action);
};
