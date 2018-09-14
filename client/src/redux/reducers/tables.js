import {
  LOADING_TABLES,
  LOADING_TABLES_SUCCESS,
  ADDING_TABLE,
  ADDING_TABLE_SUCCESS,
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

    case ADDING_TABLE:
      return { ...state, loading: true };

    case ADDING_TABLE_SUCCESS:
      return { ...state, tableList: [...state.tableList, action.payload] };

    case MOVE_TABLE:
      return { ...state, tableList: action.payload };

    case SAVING_TABLES:
      return { ...state, loading: true };

    case SAVING_TABLES_SUCCESS: // ? Do we need: `tableList: action.payload` ?
      return { ...state, loading: false };

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
