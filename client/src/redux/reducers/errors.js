import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  PASSWORD_MATCH_ERROR,
  PASSWORD_MATCH_SUCCESS
} from '../actions/auth';
import {
  LOADING_TABLES_ERROR,
  LOADING_TABLES_SUCCESS,
  ADDING_TABLE_ERROR,
  ADDING_TABLE_SUCCESS,
  SAVING_TABLES_ERROR,
  SAVING_TABLES_SUCCESS,
  DEACTIVATING_TABLE_ERROR,
  DEACTIVATING_TABLE_SUCCESS
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
  DELETING_PARTY_SUCCESS
} from '../actions/party';
import { LOADING_ITEMS_ERROR, LOADING_ITEMS_SUCCESS } from '../actions/items';
import { LOADING_RESTAURANT_ERROR, LOADING_RESTAURANT_SUCCESS } from '../actions/restaurant';

const initialState = {
  loginError: false,
  passMatchError: false,
  loadingTablesError: false,
  addingTablesError: false,
  savingTablesError: false,
  deactivatingTablesError: false,
  loadingPartiesError: false,
  loadingPartyError: false,
  addingPartyError: false,
  updatingPartyError: false,
  deletingPartyError: false,
  loadingItemsError: false,
  loadingRestaurantError: false,
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
      return { ...errors, loadingTablesError: action.payload };
    case LOADING_TABLES_SUCCESS:
      return { ...errors, loadingTablesError: false };
    case ADDING_TABLE_ERROR:
      return { ...errors, addingTableError: action.payload };
    case ADDING_TABLE_SUCCESS:
      return { ...errors, addingTableError: false };
    case SAVING_TABLES_ERROR:
      return { ...errors, savingTablesError: action.payload };
    case SAVING_TABLES_SUCCESS:
      return { ...errors, savingTablesError: false };
    case DEACTIVATING_TABLE_ERROR:
      return { ...errors, deactivatingTablesError: action.payload };
    case DEACTIVATING_TABLE_SUCCESS:
      return { ...errors, deactivatingTablesError: false };

    case LOADING_PARTIES_ERROR:
      return { ...errors, loadingPartiesError: action.payload };
    case LOADING_PARTIES_SUCCESS:
      return { ...errors, loadingPartiesError: false };
    case LOADING_PARTY_ERROR:
      return { ...errors, loadingPartyError: action.payload };
    case LOADING_PARTY_SUCCESS:
      return { ...errors, loadingPartyError: false };
    case ADDING_PARTY_ERROR:
      return { ...errors, addingPartyError: action.payload };
    case ADDING_PARTY_SUCCESS:
      return { ...errors, addingPartyError: false };
    case UPDATING_PARTY_ERROR:
      return { ...errors, updatingPartyError: action.payload };
    case UPDATING_PARTY_SUCCESS:
      return { ...errors, updatingPartyError: false };
    case DELETING_PARTY_ERROR:
      return { ...errors, deletingPartyError: action.payload };
    case DELETING_PARTY_SUCCESS:
      return { ...errors, deletingPartyError: false };

    case LOADING_ITEMS_ERROR:
      return { ...errors, loadingItemsError: action.payload };
    case LOADING_ITEMS_SUCCESS:
      return { ...errors, loadingItemsError: false };

    case LOADING_RESTAURANT_ERROR:
      return { ...errors, loadingRestaurantError: action.payload };
    case LOADING_RESTAURANT_SUCCESS:
      return { ...errors, loadingRestaurantError: false };

    default:
      return errors;
  }
};

export default ErrorReducer;
