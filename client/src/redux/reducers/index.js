import { combineReducers } from 'redux';

import ModalReducer from './modal';
import AuthReducer from './auth';
import ErrorReducer from './errors';
import TablesReducer from './tables';
import PartyReducer from './party';
import ItemsReducer from './items';
import RestaurantReducer from './restaurant';
import ServerReducer from './servers';

const rootReducer = combineReducers({
  modal: ModalReducer,
  auth: AuthReducer,
  errors: ErrorReducer,
  tables: TablesReducer,
  party: PartyReducer,
  items: ItemsReducer,
  restaurant: RestaurantReducer,
  servers: ServerReducer,
});

export default rootReducer;
