import axios from 'axios';

const usersMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_MEMBERS') {
    axios.get('http://localhost:3000/members')
      .then((response) => {
        store.dispatch({ type: 'GET_MEMBERS_SUCCESS', users: response.data });
      });
  }

  if (action.type === 'GET_ONE_MEMBER') {
    const url = window.location.href;
    // pour avoir le dernier segment de l'url
    const lastSegmentUrl = url.split('/').pop();
    axios.get(`http://localhost:3000/members/${lastSegmentUrl}`)
      .then((response) => {
        store.dispatch({ type: 'GET_ONE_MEMBER_SUCCESS', user: response.data });
      });
  }

  next(action);
};

export default usersMiddleware;
