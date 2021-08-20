import { combineReducers } from 'redux';

import signupReducer from './signup';
import usersReducer from './users';
import globalReducer from './global';

const rootReducer = combineReducers({
  signup: signupReducer,
  users: usersReducer,
  global: globalReducer,
});

export default rootReducer;
