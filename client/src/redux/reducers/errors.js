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
  LOADING_PARTIES_ERROR,
  LOADING_PARTIES_SUCCESS,
  LOADING_PARTY_ERROR,
  LOADING_PARTY_SUCCESS,
  ADDING_PARTY_ERROR,
  ADDING_PARTY_SUCCESS,
  UPDATING_PARTY_ERROR,
  UPDATING_PARTY_SUCCESS,
  DELETING_PARTY_ERROR,
  DELETING_PARTY_SUCCESS,
} from '../actions/party';

const initialState = {
  loginError: false,
  passMatchError: false,
  loadingTablesError: false,
  loadingPartiesError: false,
  loadingPartyError: false,
  addingPartyError: false,
  updatingPartyError: false,
  deletingPartyError: false,
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
    case LOADING_PARTIES_ERROR:
      return { ...errors, loadingPartiesError: true };
    case LOADING_PARTIES_SUCCESS:
      return { ...errors, loadingPartiesError: false };
    case LOADING_PARTY_ERROR:
      return { ...errors, loadingPartyError: true };
    case LOADING_PARTY_SUCCESS:
      return { ...errors, loadingPartyError: false };
    case ADDING_PARTY_ERROR:
      return { ...errors, addingPartyError: true };
    case ADDING_PARTY_SUCCESS:
      return { ...errors, addingPartyError: false };
    case UPDATING_PARTY_ERROR:
      return { ...errors, updatingPartyError: true };
    case UPDATING_PARTY_SUCCESS:
      return { ...errors, updatingPartyError: false };
    case DELETING_PARTY_ERROR:
      return { ...errors, deletingPartyError: true };
    case DELETING_PARTY_SUCCESS:
      return { ...errors, deletingPartyError: false };
    default:
      return errors;
  }
};

export default ErrorReducer;
