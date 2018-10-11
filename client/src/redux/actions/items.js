import axios from 'axios';
import { toast } from 'react-toastify';

// URIs
import serverURI from '../../config/URI';
// Helpers
import errorHandler from '../helpers/errorHandler';

export const LOADING_ITEMS = 'LOADING_ITEMS';
export const LOADING_ITEMS_SUCCESS = 'LOADING_ITEMS_SUCCESS';
export const LOADING_ITEMS_ERROR = 'LOADING_ITEMS_ERROR';
export const ADDING_ITEM = 'ADDING_ITEM';
export const ADDING_ITEM_SUCCESS = 'ADDING_ITEM_SUCCESS';
export const ADDING_ITEM_ERROR = 'ADDING_ITEM_ERROR';
export const DELETING_ITEM = 'DELETING_ITEM';
export const DELETING_ITEM_SUCCESS = 'DELETING_ITEM_SUCCESS';
export const DELETING_ITEM_ERROR = 'DELETING_ITEM_ERROR';

export const getItems = () => (dispatch) => {
  dispatch({ type: LOADING_ITEMS });
  return axios
    .get(`${serverURI}/api/items/all`)
    .then((res) => {
      dispatch({ type: LOADING_ITEMS_SUCCESS, payload: res.data.items });
    })
    .catch((err) => {
      dispatch({ type: LOADING_ITEMS_ERROR, payload: err });
      errorHandler(err);
    });
};

export const addItem = (item) => (dispatch) => {
  if (item.category) {
    item.category = item.category.replace(/^\w/, item.category[0].toUpperCase());
  }
  dispatch({ type: ADDING_ITEM });
  return axios
    .post(`${serverURI}/api/items/add`, item)
    .then((res) => {
      dispatch({ type: ADDING_ITEM_SUCCESS, payload: res.data.items });
      toast('Successfully added item.');
    })
    .catch((err) => {
      dispatch({ type: ADDING_ITEM_ERROR, payload: err });
      errorHandler(err);
    });
};

export const deleteItem = (id) => (dispatch) => {
  dispatch({ type: DELETING_ITEM });
  return axios
    .delete(`${serverURI}/api/items/delete/${id}`)
    .then((res) => {
      dispatch({ type: DELETING_ITEM_SUCCESS });
      toast(res.data.msg);
    })
    .catch((err) => {
      dispatch({ type: DELETING_ITEM_ERROR, payload: err });
      errorHandler(err);
    });
};
