import io from 'socket.io-client';

let socket;

const socketMiddleware = (store) => (next) => (action) => {
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
        console.log('GET_NEW_MESSAGE response.message', response.message);
        store.dispatch({ type: 'GET_NEW_MESSAGE', message: response.message });
      }
      if (response.notification === 'invitation') {
        console.log('je reçois notif dans RECONNECT_USER');
        console.log(response);
        store.dispatch({ type: 'GET_NEW_INVITATION', invitation: response.invitation });
      }
    });
    next(action);
  }

  if (action.type === 'ADD_MESSAGE_SUCCESS') {
    console.log(action.message);
    socket.emit('sendMessage', action.message, () => {
      socket.on('notifications', (response) => {
        if (response.notification === 'message') {
          console.log('ADD_MESSAGE_SUCCESS response.message', response.message);
          store.dispatch({ type: 'GET_NEW_MESSAGE', message: response.message });
        }
      });
    });
    next(action);
  }
  if (action.type === 'SEND_INVITATION_SUCCESS') {
    console.log('je passe au bon endroit mais pas d\'action');
    socket.emit('sendInvitation', action.invitation, () => {
      console.log('je send l\'invit');
      socket.on('notifications', (response) => {
        console.log('je reçois notif dans action SEND_INVITATION_SUCCESS');
        console.log(response);
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
