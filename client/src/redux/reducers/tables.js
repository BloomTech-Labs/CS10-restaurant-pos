import {
  LOADING_TABLES,
  LOADING_TABLES_SUCCESS,
  ADDING_TABLE,
  ADDING_TABLE_SUCCESS,
  MOVE_TABLE,
  SAVING_TABLES,
  SAVING_TABLES_SUCCESS,
  DEACTIVATING_TABLE,
  DEACTIVATING_TABLE_SUCCESS,
  TOGGLE_TABLE,
  TOGGLE_EDIT,
  SIDEBAR_REF,
  TOPBAR_REF
} from '../actions/tables';

const initialState = {
  tableList: [],
  selected: new Set(),
  editing: false,
  loading: false,
  sidebarRef: null,
  topbarRef: null
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
        tableList: state.tableList.map(table => {
          if (table._id === updatedTable._id) return updatedTable;
          return table;
        })
      };

    case TOGGLE_TABLE:
      const table = action.payload; // eslint-disable-line no-case-declarations
      const newSet = new Set(state.selected); // eslint-disable-line no-case-declarations
      if (state.selected.has(table)) {
        newSet.delete(table);
        return { ...state, selected: newSet };
      }
      return { ...state, selected: newSet.add(table) };

    case TOGGLE_EDIT:
      return { ...state, editing: !state.editing };

    case SIDEBAR_REF:
      return { ...state, sidebarRef: action.payload };

    case TOPBAR_REF:
      return { ...state, topbarRef: action.payload };

    default:
      return state;
  }
};

export default TablesReducer;
