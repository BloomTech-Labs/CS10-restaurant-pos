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
  DELETING_PARTY_SUCCESS,
} from '../actions/party';

const initialState = {
  party: {},
  partyList: [],
  loading: false,
  deletedPayload: false, // TODO: Do we want to keep this payload?
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
      // TODO: Determine if we want lines 32, 38, & 44
      // TODO: to both store their data inside of the party key
      return { ...state, loading: false, party: action.payload };
    case ADDING_PARTY:
      return { ...state, loading: true };
    case ADDING_PARTY_SUCCESS:
      // TODO: Determine if we want lines 32, 38, & 44
      // TODO: to both store their data inside of the party key
      return { ...state, loading: false, party: action.payload };
    case UPDATING_PARTY:
      return { ...state, loading: true };
    case UPDATING_PARTY_SUCCESS:
      // TODO: Determine if we want lines 32, 38, & 44
      // TODO: to both store their data inside of the party key
      return { ...state, loading: false, party: action.payload };
    case DELETING_PARTY:
      return { ...state, loading: true };
    case DELETING_PARTY_SUCCESS:
      return { ...state, loading: false, deletedPayload: action.payload };
    default:
      return state;
  }
};

export default PartyReducer;
