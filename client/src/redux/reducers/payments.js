import {
  SENDING_PAYMENT,
  PAYMENT_SUCCESS,
  SUBSCRIBING,
  SUBSCRIBING_SUCCESS,
  UNSUBSCRIBING,
  UNSUBSCRIBING_SUCCESS
} from '../actions/payments';

const initialState = {
  loading: false
};

const PaymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDING_PAYMENT:
      return { ...state, loading: true };

    case PAYMENT_SUCCESS:
      return { ...state, loading: false };

    case SUBSCRIBING:
      return { ...state, loading: true };

    case SUBSCRIBING_SUCCESS:
      return { ...state, loading: false };

    case UNSUBSCRIBING:
      return { ...state, loading: true };

    case UNSUBSCRIBING_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default PaymentsReducer;
