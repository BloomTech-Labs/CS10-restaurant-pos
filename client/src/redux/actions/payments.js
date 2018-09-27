import axios from 'axios';

import serverURI from '../../config/URI';

import { updateParty, deleteParty } from './party';
import { SET_INITIAL_AUTH } from './auth';
import { closeSplitModal, openModal, closeModal } from './modal';

export const SENDING_PAYMENT = 'SENDING_PAYMENT';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_ERROR = 'PAYMENT_ERROR';
export const CLEAR_ORDER_CLIENT = 'CLEAR_ORDER_CLIENT';

export const sendPayment = (stripe, amount, description, isSplit, partyId) => (
  dispatch,
  getState
) => {
  // const stripeToken =
  dispatch({ type: SENDING_PAYMENT });
  axios
    .post(`${serverURI}/api/checkout`, { stripeToken: stripe.token.id, amount, description })
    .then(res => {
      dispatch({ type: PAYMENT_SUCCESS, payload: res.data });

      if (isSplit) {
        const { order, splitOrder } = getState().party;

        const food = order
          .filter(item => splitOrder
            .find(splitItem => item.localRef !== splitItem.localRef));

        dispatch(updateParty(partyId, { food }));
        dispatch(closeSplitModal());
        dispatch(openModal());
      } else {
        dispatch({ type: CLEAR_ORDER_CLIENT });
        dispatch(deleteParty(partyId));
        dispatch(closeModal());
      }
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
      localStorage.setItem('jwt', res.data.token);
      dispatch({ type: SET_INITIAL_AUTH });
      dispatch({ type: PAYMENT_SUCCESS, payload: res.data.token });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: PAYMENT_ERROR, payload: err });
    });
};
