import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_ITEMS = 'LOADING_ITEMS';
export const LOADING_ITEMS_SUCCESS = 'LOADING_ITEMS_SUCCESS';
export const LOADING_ITEMS_ERROR = 'LOADING_ITEMS_ERROR';

export const getItems = () => (
  (dispatch) => {
    dispatch({ type: LOADING_ITEMS });
    axios
      .get(`${serverURI}/api/items/all`)
      .then((res) => {
        dispatch({ type: LOADING_ITEMS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: LOADING_ITEMS_ERROR, payload: err });
      });
  }
);
