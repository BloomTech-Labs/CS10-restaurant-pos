import {
  SENDING_PAYMENT,
  PAYMENT_SUCCESS,
} from '../actions/payments';

const initialState = {
  loading: false,
};

const PaymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDING_PAYMENT:
      return { ...state, loading: true };

    case PAYMENT_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default PaymentsReducer;
