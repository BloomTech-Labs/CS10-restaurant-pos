import { goBack } from 'connected-react-router';

export const navigateBack = () => (
  (dispatch) => {
    dispatch(goBack());
  }
);
