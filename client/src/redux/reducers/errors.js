import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  PASSWORD_MATCH_ERROR,
  PASSWORD_MATCH_SUCCESS,
} from '../actions/auth';

import {
  LOADING_TABLES_ERROR,
  LOADING_TABLES_SUCCESS,
} from '../actions/tables';

const initialState = {
  loginError: false,
  passMatchError: false,
  loadingTablesError: false,
};

const ErrorReducer = (errors = initialState, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
      return { ...errors, loginError: action.payload };
    case LOGIN_SUCCESS:
      return { ...errors, loginError: false };
    case PASSWORD_MATCH_ERROR:
      return { ...errors, passMatchError: action.payload };
    case PASSWORD_MATCH_SUCCESS:
      return { ...errors, passMatchError: false };
    case LOADING_TABLES_ERROR:
      return { ...errors, loadingTablesError: true };
    case LOADING_TABLES_SUCCESS:
      return { ...errors, loadingTablesError: false };
    default:
      return errors;
  }
};

export default ErrorReducer;
