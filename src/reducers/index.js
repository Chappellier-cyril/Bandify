import { combineReducers } from 'redux';

import signupReducer from './signup';
import usersReducer from './users';
import settingsReducer from './settings';

const rootReducer = combineReducers({
  signup: signupReducer,
  users: usersReducer,
  settings: settingsReducer,
});

export default rootReducer;
