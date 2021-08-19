import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'src/reducers';

import authMiddleware from 'src/middlewares/authMiddleware';
import usersMiddleware from 'src/middlewares/usersMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(authMiddleware, usersMiddleware),
);

const store = createStore(reducer, enhancers);

export default store;
