import {
  LOADING_RESTAURANT,
  LOADING_RESTAURANT_SUCCESS,
  ADDING_RESTAURANT,
  ADDING_RESTAURANT_SUCCESS
} from '../actions/restaurant';

const initialState = {
  restaurantInfo: {},
  loading: false
};

const RestaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_RESTAURANT:
      return { ...state, loading: true };

    case LOADING_RESTAURANT_SUCCESS:
      return { ...state, loading: false, restaurantInfo: action.payload };

    case ADDING_RESTAURANT:
      return { ...state, loading: true };

    case ADDING_RESTAURANT_SUCCESS: // TODO: verify the necessity of this payload
      return { ...state, loading: false, restaurantInfo: action.payload };

    default:
      return state;
  }
};

export default RestaurantReducer;
