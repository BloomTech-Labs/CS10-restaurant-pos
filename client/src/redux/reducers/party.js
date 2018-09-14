import {
  LOADING_PARTIES,
  LOADING_PARTIES_SUCCESS,
  LOADING_PARTY,
  LOADING_PARTY_SUCCESS,
  ADDING_PARTY,
  ADDING_PARTY_SUCCESS,
  UPDATING_PARTY,
  UPDATING_PARTY_SUCCESS,
  DELETING_PARTY,
  DELETING_PARTY_SUCCESS
} from '../actions/party';
import { DEACTIVATING_TABLE_SUCCESS } from '../actions/tables';

const initialState = {
  fetchedParty: {},
  partyList: [],
  loading: false
};

const PartyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PARTIES:
      return { ...state, loading: true };

    case LOADING_PARTIES_SUCCESS:
      return { ...state, loading: false, partyList: action.payload };

    case LOADING_PARTY:
      return { ...state, loading: true };

    case LOADING_PARTY_SUCCESS:
      return { ...state, loading: false, fetchedParty: action.payload };

    case ADDING_PARTY:
      return { ...state, loading: true };

    case ADDING_PARTY_SUCCESS:
      return {
        ...state,
        loading: false,
        partyList: [...state.partyList, action.payload]
      };

    case UPDATING_PARTY:
      return { ...state, loading: true };

    case UPDATING_PARTY_SUCCESS:
      return {
        ...state,
        loading: false,
        partyList: state.partyList.map((party) => {
          if (party._id === action.payload._id) return action.payload;
          return party;
        })
      };

    case DELETING_PARTY:
      return { ...state, loading: true };

    case DELETING_PARTY_SUCCESS:
      return {
        ...state,
        loading: false,
        partyList: state.partyList.filter((party) => party._id !== action.payload.removedParty._id)
      };

    // ? Should we add the populatedParty to state.fetchedParty?
    case DEACTIVATING_TABLE_SUCCESS:
      const { populatedParty } = action.payload; // eslint-disable-line no-case-declarations
      return {
        ...state,
        partyList: state.partyList.map((party) => {
          if (party._id === populatedParty._id) return populatedParty;
          return party;
        })
      };

    default:
      return state;
  }
};

export default PartyReducer;
