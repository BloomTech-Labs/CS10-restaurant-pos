import axios from 'axios';

import serverURI from '../../config/URI';

export const SENDING_PAYMENT = 'SENDING_PAYMENT';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_ERROR = 'PAYMENT_ERROR';

export const sendPayment = (token, amount, description) => dispatch => {
  // const stripeToken =
  dispatch({ type: SENDING_PAYMENT });
  axios
    .post(`${serverURI}/api/checkout`, { stripeToken: token.id, amount, description })
    .then(res => {
      dispatch({ type: PAYMENT_SUCCESS, payload: res.data });
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
