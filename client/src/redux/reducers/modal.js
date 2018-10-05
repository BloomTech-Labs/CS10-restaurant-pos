import { OPEN_MODAL, CLOSE_MODAL, OPEN_SPLIT_MODAL, CLOSE_SPLIT_MODAL } from '../actions/modal';

const initialState = {
  isOpen: false,
  splitModalIsOpen: false,
};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true };

    case CLOSE_MODAL:
      return { ...state, isOpen: false };

    case OPEN_SPLIT_MODAL:
      return { ...state, splitModalIsOpen: true };

    case CLOSE_SPLIT_MODAL:
      return { ...state, splitModalIsOpen: false };

    default:
      return state;
  }
};

export default ModalReducer;
