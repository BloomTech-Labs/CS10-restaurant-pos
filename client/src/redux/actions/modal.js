export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_SPLIT_MODAL = 'OPEN_SPLIT_MODAL';
export const CLOSE_SPLIT_MODAL = 'CLOSE_SPLIT_MODAL';

export const openModal = () => ({
  type: OPEN_MODAL
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const openSplitModal = () => ({
  type: OPEN_SPLIT_MODAL
});

export const closeSplitModal = () => ({
  type: CLOSE_SPLIT_MODAL
});
