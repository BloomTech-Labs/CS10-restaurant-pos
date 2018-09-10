import { combineReducers } from 'redux';
//import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  auth: AuthReducer,
  //form: FormReducer,
});

export default rootReducer;
