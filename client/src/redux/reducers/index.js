import { combineReducers } from 'redux';
import AuthReducer from './auth';
import ErrorReducer from './errors';
import TablesReducer from './tables';

const rootReducer = combineReducers({
  auth: AuthReducer,
  errors: ErrorReducer,
  tables: TablesReducer,
});

export default rootReducer;
