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
import {
  LOADING_PARTY_ERROR,
  LOADING_PARTY_SUCCESS
} from '../actions/party';

const initialState = {
  loginError: false,
  passMatchError: false,
  loadingTablesError: false,
  loadingParyError: false,
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
    case LOADING_PARTY_ERROR:
      return { ...errors, loadingPartyError: true };
    case LOADING_PARTY_SUCCESS:
      return { ...errors, loadingPartyError: false };
    default:
      return errors;
  }
};

export default ErrorReducer;
