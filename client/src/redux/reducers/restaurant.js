import {
  ADDING_RESTAURANT,
  ADDING_RESTAURANT_SUCCESS
} from '../actions/restaurant';

const initialState = {
  restaurantInfo: {},
  loading: false
};

const RestaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_RESTAURANT:
      return { ...state, loading: true };

    case ADDING_RESTAURANT_SUCCESS:
      return { ...state, loading: false, restaurantInfo: action.payload };

    default:
      return state;
  }
};

export default RestaurantReducer;
