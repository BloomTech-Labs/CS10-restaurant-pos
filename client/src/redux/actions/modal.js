export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_SPLIT_MODAL = 'OPEN_SPLIT_MODAL';
export const CLOSE_SPLIT_MODAL = 'CLOSE_SPLIT_MODAL';
export const CLEAR_SPLIT_ORDER = 'CLEAR_SPLIT_ORDER';
export const REMOVE_SPLIT_ORDER_FROM_ORDER = 'REMOVE_SPLIT_ORDER_FROM_ORDER';

export const openModal = () => ({
  type: OPEN_MODAL
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const openSplitModal = () => ({
  type: OPEN_SPLIT_MODAL
});

export const closeSplitModal = (checkout) => (dispatch) => {
  if (checkout) dispatch({ type: REMOVE_SPLIT_ORDER_FROM_ORDER });
  dispatch({ type: CLEAR_SPLIT_ORDER });
  dispatch({ type: CLOSE_SPLIT_MODAL });
};
