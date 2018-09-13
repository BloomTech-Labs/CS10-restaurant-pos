import { combineReducers } from 'redux';

import AuthReducer from './auth';
import ErrorReducer from './errors';
import TablesReducer from './tables';
import PartyReducer from './party';

const rootReducer = combineReducers({
  auth: AuthReducer,
  errors: ErrorReducer,
  tables: TablesReducer,
  party: PartyReducer,
});

export default rootReducer;
