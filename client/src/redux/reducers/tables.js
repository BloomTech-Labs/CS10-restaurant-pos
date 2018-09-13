import { LOADING_TABLES, LOADING_TABLES_SUCCESS, ADD_TABLE } from '../actions/tables';

const initialState = {
  tableList: [],
  loading: false,
};

const TablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_TABLES:
      return { ...state, loading: true };

    case LOADING_TABLES_SUCCESS:
      return { ...state, loading: false, tableList: action.payload };

    case ADD_TABLE:
      return { ...state, tableList: [ ...state.tableList, action.payload ] };

      // case MOVE_TABLE:
      //   return { ...state, tableList}

    default:
      return state;
  }
};

export default TablesReducer;
