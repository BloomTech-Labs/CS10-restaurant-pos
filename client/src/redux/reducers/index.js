import { combineReducers } from 'redux';

import AuthReducer from './auth';
import ErrorReducer from './errors';
import TablesReducer from './tables';
import PartyReducer from './party';
import ItemsReducer from './items';

const rootReducer = combineReducers({
  auth: AuthReducer,
  errors: ErrorReducer,
  tables: TablesReducer,
  party: PartyReducer,
  items: ItemsReducer,
});

export default rootReducer;
