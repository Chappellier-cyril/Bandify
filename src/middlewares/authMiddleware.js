import axios from 'axios';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'ON_LOGIN_SUBMIT') {
    // on commence par récupérer un instantané du state
    // dans lequel nous viendrons piocher email et password
    const state = store.getState();
    const options = {
      method: 'POST',
      url: `${process.env.BANDIFY_API_URL}/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        // on vient chercher dans le state ce qui nous intéresse
        email: state.login.email,
        user_password: state.login.password,
      },
    };

    axios(options)
      .then((response) => {
        // ON clear le localstorage au cas où avant
        localStorage.clear();
        // On y STOCKE (setItem) les infos du user + le token
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('token', response.data.token);
        store.dispatch({ type: 'ON_LOGIN_SUCCESS', data: response.data });
      })
      .catch((e) => {
        console.log(e);
        store.dispatch({ type: 'ON_LOGIN_ERROR' });
      });
  }

  else {
    next(action);
  }
};

export default authMiddleware;
