import { LOADING_ITEMS, LOADING_ITEMS_SUCCESS } from '../actions/items';

const initialState = {
  itemList: [],
  loading: false
};

const TablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ITEMS:
      return { ...state, loading: true };

    case LOADING_ITEMS_SUCCESS:
      return { ...state, loading: false, itemList: action.payload };

    default:
      return state;
  }
};

export default TablesReducer;
