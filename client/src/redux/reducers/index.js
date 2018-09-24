import { combineReducers } from 'redux';

import ModalReducer from './modal';
import AuthReducer from './auth';
import ErrorReducer from './errors';
import TablesReducer from './tables';
import PartyReducer from './party';
import ItemsReducer from './items';
import RestaurantReducer from './restaurant';
import ServerReducer from './servers';
import PaymentsReducer from './payments';

const appReducer = combineReducers({
  modal: ModalReducer,
  auth: AuthReducer,
  errors: ErrorReducer,
  tables: TablesReducer,
  party: PartyReducer,
  items: ItemsReducer,
  restaurant: RestaurantReducer,
  servers: ServerReducer,
  payments: PaymentsReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
