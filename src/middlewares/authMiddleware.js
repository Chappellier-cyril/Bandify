import axios from 'axios';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'ON_LOGIN_SUBMIT') {
    // on commence par récupérer un instantané du state
    // dans lequel nous viendrons piocher email et password
    const state = store.getState();

    const options = {
      method: 'POST',
      url: 'http://localhost:3000/login',
      data: {
        // on vient chercher dans le state ce qui nous intéresse
        email: state.users.user.email,
        password: state.users.user.password,
      },
    };

    axios(options).then((response) => {
      store.dispatch({ type: 'ON_LOGIN_SUCCESS', data: response.data });
    }).catch(() => {
      store.dispatch({ type: 'ON_LOGIN_ERROR' });
    });
  }
  else {
    next(action);
  }
};

export default authMiddleware;
