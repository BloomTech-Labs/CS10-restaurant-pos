import { combineReducers } from 'redux';
import AuthReducer from './auth';
import ErrorReducer from './errors';

const rootReducer = combineReducers({
  auth: AuthReducer,
  errors: ErrorReducer,
});

export default rootReducer;
