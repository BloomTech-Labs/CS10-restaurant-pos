import {
  ADDING_RESTAURANT,
  ADDING_RESTAURANT_SUCCESS,
  GETTING_TAXRATE,
  GET_TAXRATE_SUCCESS,
} from '../actions/restaurant';

const initialState = {
  restaurantInfo: {},
  taxRate: 0,
  loading: false
};

const RestaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_RESTAURANT:
      return { ...state, loading: true };

    case ADDING_RESTAURANT_SUCCESS:
      return { ...state, loading: false, restaurantInfo: action.payload };

    case GETTING_TAXRATE:
      return { ...state, loading: true };

    case GET_TAXRATE_SUCCESS:
      return { ...state, loading: false, taxRate: action.payload };

    default:
      return state;
  }
};

export default RestaurantReducer;
