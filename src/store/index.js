import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'src/reducers';

import authMiddleware from 'src/middlewares/authMiddleware';
import usersMiddleware from 'src/middlewares/usersMiddleware';
import signupMiddleware from 'src/middlewares/signupMiddleware';
import searchMiddleware from 'src/middlewares/searchMiddleware';
import chatMiddleware from 'src/middlewares/chatMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    authMiddleware,
    usersMiddleware,
    signupMiddleware,
    searchMiddleware,
    chatMiddleware,
  ),
);

const store = createStore(reducer, enhancers);

export default store;
