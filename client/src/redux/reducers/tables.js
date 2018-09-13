import {
  LOADING_TABLES,
  LOADING_TABLES_SUCCESS,
} from '../actions/tables';

const initialState = {
  tables: [],
  loading: false,
};

const TablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_TABLES:
      return { ...state, loading: true };

    case LOADING_TABLES_SUCCESS:
      return { ...state, loading: false, tables: action.payload };

    default:
      return state;
  }
};

export default TablesReducer;
