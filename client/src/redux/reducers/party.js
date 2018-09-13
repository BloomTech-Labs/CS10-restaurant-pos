import { LOADING_PARTY, LOADING_PARTY_SUCCESS } from '../actions/party';

const initialState = {
  partyList: [],
  loading: false,
};

const PartyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PARTY:
      return { ...state, loading: true };

    case LOADING_PARTY_SUCCESS:
      return { ...state, loading: false, partyList: action.payload };

    default:
      return state;
  }
};

export default PartyReducer;
