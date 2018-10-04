import {
  LOADING_ITEMS,
  LOADING_ITEMS_SUCCESS,
  ADDING_ITEM,
  ADDING_ITEM_SUCCESS,
} from '../actions/items';

const initialState = {
  itemList: [],
  loading: false,
};

const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ITEMS:
      return { ...state, loading: true };

    case LOADING_ITEMS_SUCCESS:
      return { ...state, loading: false, itemList: action.payload };

    case ADDING_ITEM:
      return { ...state, loading: true };

    case ADDING_ITEM_SUCCESS:
      return { ...state, loading: false, itemList: action.payload };

    default:
      return state;
  }
};

export default ItemsReducer;
