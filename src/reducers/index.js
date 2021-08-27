import { combineReducers } from 'redux';

import signupReducer from './signup';
import usersReducer from './users';
import settingsReducer from './settings';
import loginReducer from './login';
import socketReducer from './socket';

const rootReducer = combineReducers({
  signup: signupReducer,
  users: usersReducer,
  settings: settingsReducer,
  login: loginReducer,
  socket: socketReducer,
});

export default rootReducer;
