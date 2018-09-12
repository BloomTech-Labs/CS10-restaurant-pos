import {
  LOADING_TABLES,
  LOADED_TABLES,
} from '../actions/tables';

const initialState = {
  tables: [],
  loading: false,
};

const TablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_TABLES:
      return { ...state, loading: true };

    case LOADED_TABLES:
      return { ...state, loading: false, tables: action.payload };

    default:
      return state;
  }
};

export default TablesReducer;
