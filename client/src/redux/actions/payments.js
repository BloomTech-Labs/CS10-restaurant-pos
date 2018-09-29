import axios from 'axios';

import serverURI from '../../config/URI';

import { updateParty, deleteParty } from './party';
import { SET_INITIAL_AUTH } from './auth';
import { closeSplitModal, openModal, closeModal } from './modal';

export const SENDING_PAYMENT = 'SENDING_PAYMENT';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_ERROR = 'PAYMENT_ERROR';
export const SUBSCRIBING = 'SUBSCRIBING';
export const SUBSCRIBING_SUCCESS = 'SUBSCRIBING_SUCCESS';
export const SUBSCRIBING_ERROR = 'SUBSCRIBING_ERROR';
export const UNSUBSCRIBING = 'UNSUBSCRIBING';
export const UNSUBSCRIBING_SUCCESS = 'UNSUBSCRIBING_SUCCESS';
export const UNSUBSCRIBING_ERROR = 'UNSUBSCRIBING_ERROR';
export const CLEAR_ORDER_CLIENT = 'CLEAR_ORDER_CLIENT';

export const sendPayment = (stripe, amount, description, isSplit, partyId, push) => (
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
            .find(splitItem => item.uniqueId !== splitItem.uniqueId));

        dispatch(updateParty(partyId, { food }));
        dispatch(closeSplitModal());
        dispatch(openModal());
      } else {
        dispatch({ type: CLEAR_ORDER_CLIENT });
        dispatch(deleteParty(partyId));
        dispatch(closeModal());
        push('/tables');
      }
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: PAYMENT_ERROR, payload: err });
    });
};

export const subscribe = token => dispatch => {
  dispatch({ type: SUBSCRIBING });
  axios
    .post(`${serverURI}/api/subscribe`, { stripeToken: token.id, email: token.email })
    .then(res => {
      localStorage.setItem('jwt', res.data.token);
      dispatch({ type: SET_INITIAL_AUTH });
      dispatch({ type: SUBSCRIBING_SUCCESS, payload: res.data.token });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: SUBSCRIBING_ERROR, payload: err });
    });
};

export const unsubscribe = () => dispatch => {
  dispatch({ type: UNSUBSCRIBING });
  axios
    .get(`${serverURI}/api/cancel`)
    .then(() => {
      dispatch({ type: SET_INITIAL_AUTH });
      dispatch({ type: UNSUBSCRIBING_SUCCESS });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: UNSUBSCRIBING_ERROR, payload: err });
    });
};
