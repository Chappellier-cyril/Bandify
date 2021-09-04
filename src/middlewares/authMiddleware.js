import axios from 'axios';

const authMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  if (action.type === 'GET_INIT') {
    console.log(action.type);
    // On récupère notre token
    const token = localStorage.getItem('token');
    // Si on en a un, on fait une requête vers le serveur
    // En y emporter au passage, le "timbre" (headers : x-acces-token)
    if (token && token !== undefined) {
      axios.post(`${process.env.BANDIFY_API_URL}/checkToken`, {
        headers: {
          'x-acces-token': localStorage.getItem('token'),
        },
      })
        .then((response) => {
          // On crée un objet user en réponse, pour rester logger
          if (response) {
            const user = {
              id: localStorage.getItem('userId'),
              email: localStorage.getItem('userEmail'),
              token: localStorage.getItem('token'),
            };
            store.dispatch({ type: 'RECONNECT_USER', user });
            store.dispatch({ type: 'SET_INIT' });
          }
        })
        .catch(() => {
          localStorage.clear();
          store.dispatch({ type: 'SET_INIT' });
        }).then(() => {
          store.dispatch({ type: 'SET_INIT' });
        });
    }
  }
  if (action.type === 'ON_LOGIN_SUBMIT') {
    // on commence par récupérer un instantané du state
    // dans lequel nous viendrons piocher email et password

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
