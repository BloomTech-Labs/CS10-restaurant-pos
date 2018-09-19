import { LOADING_SERVERS, LOADING_SERVERS_SUCCESS } from '../actions/servers';

const initialState = {
  serverList: [],
  loading: false
};

const ServerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SERVERS:
      return { ...state, loading: true };

    case LOADING_SERVERS_SUCCESS:
      return { ...state, loading: false, serverList: action.payload };

    default:
      return state;
  }
};

export default ServerReducer;
