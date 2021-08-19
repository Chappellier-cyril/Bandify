import axios from 'axios';

const usersMiddleware = (store) => (next) => (action) => {
  // if (action.type === 'ON_LOGIN_SUBMIT') {
  //   const state = store.getState();
  //   console.log('logged !');
  //   store.dispatch({ type: 'ON_LOGIN_SUCCESS' });
  // }
  const options = {
    method: 'GET',
    url: 'http://localhost:3000/members',
  };

  axios(options).then((response) => {
    console.log(response.data);
  });
  next(action);
};

export default usersMiddleware;
