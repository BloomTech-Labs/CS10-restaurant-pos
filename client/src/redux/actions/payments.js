import axios from 'axios';

import serverURI from '../../config/URI';

import { CLEAR_SPLIT_ORDER } from './modal';

export const SENDING_PAYMENT = 'SENDING_PAYMENT';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_ERROR = 'PAYMENT_ERROR';
export const REMOVE_SPLIT_CHECK_FROM_ORDER = 'REMOVE_SPLIT_CHECK_FROM_ORDER';

export const sendPayment = (stripe, amount, description) => async dispatch => {
  // const stripeToken =
  dispatch({ type: SENDING_PAYMENT });

  axios
    .post(`${serverURI}/api/checkout`, { stripeToken: stripe.token.id, amount, description })
    .then(res => {
      dispatch({ type: PAYMENT_SUCCESS, payload: res.data });
      dispatch({ type: REMOVE_SPLIT_CHECK_FROM_ORDER });
      dispatch({ type: CLEAR_SPLIT_ORDER });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: PAYMENT_ERROR, payload: err });
    });
};

export const subscribe = token => dispatch => {
  dispatch({ type: SENDING_PAYMENT });
  axios
    .post(`${serverURI}/api/subscribe`, { stripeToken: token.id, email: token.email })
    .then(res => {
      dispatch({ type: PAYMENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: PAYMENT_ERROR, payload: err });
    });
};
