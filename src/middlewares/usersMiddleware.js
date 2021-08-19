import axios from 'axios';

const usersMiddleware = (store) => (next) => (action) => {
  // if (action.type === 'ON_LOGIN_SUBMIT') {
  //   const state = store.getState();
  //   console.log('logged !');
  //   store.dispatch({ type: 'ON_LOGIN_SUCCESS' });
  // }
  if (action.type === 'GET_MEMBERS') {
    axios.get('http://localhost:3000/members')
      .then((response) => {
        store.dispatch({ type: 'GET_MEMBERS_SUCCESS', users: response.data });
      });
  }

  next(action);
};

export default usersMiddleware;
