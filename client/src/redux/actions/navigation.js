import { goBack, push } from 'connected-react-router';

export const navigateBack = () => (
  (dispatch) => {
    dispatch(goBack());
  }
);

export const pushTo = (page) => (
  (dispatch) => {
    dispatch(push(page));
  }
);
