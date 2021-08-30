import io from 'socket.io-client';

let socket;

const socketMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  if (action.type === 'ON_LOGIN_SUCCESS') {
    socket = io('localhost:3000');
    socket.on('online-members', (members) => {
      store.dispatch({ type: 'GET_ONLINE_MEMBERS', online: members.online });
    });
    socket.emit('isOnline', { id: localStorage.getItem('userId') });
    socket.on('notifications', (response) => {
      if (response.notification === 'new message') {
        console.log('GET_NEW_MESSAGE response.message', response.message);
        store.dispatch({ type: 'GET_NEW_MESSAGE', message: response.message });
      }
      if (response.notification === 'new invitation') {
        console.log('je reçois notif dans LOGIN_SUCCESS');
        store.dispatch({ type: 'GET_NEW_INVITATION', invitation: response.invitation });
      }
    });
    next(action);
  }
  if (action.type === 'RECONNECT_USER') {
    socket = io('localhost:3000');
    socket.on('online-members', (members) => {
      store.dispatch({ type: 'GET_ONLINE_MEMBERS', online: members.online });
    });
    socket.emit('isOnline', { id: localStorage.getItem('userId') });
    socket.on('notifications', (response) => {
      if (response.notification === 'message') {
        store.dispatch({ type: 'GET_NEW_MESSAGE', message: response.message });
      }
      if (response.notification === 'invitation') {
        store.dispatch({ type: 'GET_NEW_INVITATION', invitation: response.invitation });
      }
    });
    next(action);
  }

  if (action.type === 'ADD_MESSAGE_SUCCESS') {
    if (state.settings.messageInputValue.trim() !== '') {
      socket.emit('sendMessage', action.message, () => {
        socket.on('notifications', (response) => {
          if (response.notification === 'message') {
            store.dispatch({ type: 'GET_NEW_MESSAGE', message: response.message });
          }
        });
      });
    }
    next(action);
  }
  if (action.type === 'SEND_INVITATION_SUCCESS') {
    socket.emit('sendInvitation', action.invitation, () => {
      socket.on('notifications', (response) => {
        if (response.notification === 'invitation') {
          store.dispatch({ type: 'GET_NEW_INVITATION', invitation: response.invitation });
        }
      });
    });
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
