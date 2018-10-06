import axios from 'axios';
import { toast } from 'react-toastify';

// URIs
import serverURI from '../../config/URI';
// Helpers
import errorHandler from '../helpers/errorHandler';

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

export const sendPayment = (stripe, amount, description, isSplit, partyId) => (
  dispatch,
  getState
) => {
  dispatch({ type: SENDING_PAYMENT });
  axios
    .post(`${serverURI}/api/checkout`, { stripeToken: stripe.token.id, amount, description })
    .then((res) => {
      dispatch({ type: PAYMENT_SUCCESS, payload: res.data });

      if (isSplit) {
        const { order, splitOrder } = getState().party;

        const food = order.filter(
          (item) => !splitOrder.find((splitItem) => item.uniqueId === splitItem.uniqueId)
        );

        dispatch(updateParty(partyId, { food }));
        dispatch(closeSplitModal(isSplit));
        dispatch(openModal());
      } else {
        dispatch({ type: CLEAR_ORDER_CLIENT });
        dispatch(deleteParty(partyId));
        dispatch(closeModal());
      }
      toast('Payment successful!');
    })
    .catch((err) => {
      dispatch({ type: PAYMENT_ERROR, payload: err });
      errorHandler(err);
    });
};

export const subscribe = (stripe) => (dispatch) => {
  dispatch({ type: SUBSCRIBING });
  axios
    // TODO: Do we want to just grab the email off of the token and send that one in?
    .post(`${serverURI}/api/subscribe`, { stripeToken: stripe.token.id, email: stripe.token.email })
    .then((res) => {
      localStorage.setItem('jwt', res.data.token);
      dispatch({ type: SET_INITIAL_AUTH });
      dispatch({ type: SUBSCRIBING_SUCCESS, payload: res.data.token });
      dispatch(closeModal());
      toast('Successfully subscribed!');
    })
    .catch((err) => {
      dispatch({ type: SUBSCRIBING_ERROR, payload: err });
      errorHandler(err);
    });
};

export const unsubscribe = () => (dispatch) => {
  dispatch({ type: UNSUBSCRIBING });
  axios
    .get(`${serverURI}/api/cancel`)
    .then(() => {
      dispatch({ type: SET_INITIAL_AUTH });
      dispatch({ type: UNSUBSCRIBING_SUCCESS });
      toast('Successfully unsubscribed.');
    })
    .catch((err) => {
      dispatch({ type: UNSUBSCRIBING_ERROR, payload: err });
      errorHandler(err);
    });
};
