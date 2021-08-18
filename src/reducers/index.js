import { combineReducers } from 'redux';

import signupReducer from './signup';
import usersReducer from './users';

const rootReducer = combineReducers({
  signup: signupReducer,
  users: usersReducer,
});

export default rootReducer;
