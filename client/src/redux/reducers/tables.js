import {
  LOADING_TABLES,
  LOADING_TABLES_SUCCESS,
  ADD_TABLE,
  MOVE_TABLE,
  SAVING_TABLES,
  SAVING_TABLES_SUCCESS,
  DEACTIVATING_TABLE,
  DEACTIVATING_TABLE_SUCCESS
} from '../actions/tables';

const initialState = {
  tableList: [],
  loading: false
};

const TablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_TABLES:
      return { ...state, loading: true };

    case LOADING_TABLES_SUCCESS:
      return { ...state, loading: false, tableList: action.payload };

    case ADD_TABLE:
      return { ...state, tableList: [...state.tableList, action.payload] };

    case MOVE_TABLE:
      return { ...state, tableList: action.payload };

    case SAVING_TABLES:
      return { ...state, loading: true };

    case SAVING_TABLES_SUCCESS:
      return { ...state, loading: false, tableList: action.payload };

    case DEACTIVATING_TABLE:
      return { ...state, loading: true };

    case DEACTIVATING_TABLE_SUCCESS:
      const { updatedTable } = action.payload; // eslint-disable-line no-case-declarations
      return {
        ...state,
        loading: false,
        tableList: state.tableList.map((table) => {
          if (table._id === updatedTable._id) return updatedTable;
          return table;
        })
      };

    default:
      return state;
  }
};

export default TablesReducer;
