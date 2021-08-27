import io from 'socket.io-client';

let socket;

const socketMiddleware = (store) => (next) => (action) => {
  if (action.type === 'ON_LOGIN_SUCCESS') {
    socket = io('localhost:3000');
    socket.on('online-members', (members) => {
      store.dispatch({ type: 'GET_ONLINE_MEMBERS', online: members.online });
    });
    socket.emit('isOnline', { id: localStorage.getItem('userId') });
    next(action);
  }
  if (action.type === 'RECONNECT_USER') {
    socket = io('localhost:3000');
    socket.on('online-members', (members) => {
      store.dispatch({ type: 'GET_ONLINE_MEMBERS', online: members.online });
    });
    socket.emit('isOnline', { id: localStorage.getItem('userId') });
    next(action);
  }
  if (action.type === 'ON_LOGOUT') {
    socket.disconnect();
    next(action);
  }
  else {
    next(action);
  }
};

export default socketMiddleware;
