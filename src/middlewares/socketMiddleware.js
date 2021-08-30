import io from 'socket.io-client';

let socket;

const socketMiddleware = (store) => (next) => (action) => {
  if ((action.type === 'ON_LOGIN_SUCCESS') || (action.type === 'RECONNECT_USER')) {
    console.log('je rentre dans l\'action');
    socket = io.connect(`${process.env.BANDIFY_API_URL}`);
    socket.on('online-members', (members) => {
      console.log('socket online-members');
      store.dispatch({ type: 'GET_ONLINE_MEMBERS', online: members.online });
    });
    socket.emit('isOnline', { id: localStorage.getItem('userId') });
    // socket.emit('sendMessage', action.message, () => {
    //   socket.on('notifications', (response) => {
    //     if (response.notification === 'message') {
    //       store.dispatch({ type: 'GET_NEW_MESSAGE', message: response.message });
    //     }
    //   });
    // });
    socket.on('notifications', (response) => {
      (console.log('jai une notif'));
      if (response.notification === 'message') {
        (console.log('de type message'));
        store.dispatch({ type: 'GET_NEW_MESSAGE', message: response.message });
        console.log('je srecois notif message dans LOGIN ou reconnect', response);
      }
      if (response.notification === 'invitation') {
        console.log('je srecois notif invitation', response);
        store.dispatch({ type: 'GET_NEW_INVITATION', invitation: response.invitation });
      }
    });
    next(action);
  }
  // if (action.type === 'RECONNECT_USER') {
  //   console.log('je rentre dans l\'action');
  //   socket = io(`${process.env.BANDIFY_API_URL}`);
  //   socket.on('online-members', (members) => {
  //     store.dispatch({ type: 'GET_ONLINE_MEMBERS', online: members.online });
  //   });
  //   socket.emit('isOnline', { id: localStorage.getItem('userId') });
  //   // socket.emit('sendMessage', action.message, () => {
  //   //   socket.on('notifications', (response) => {
  //   //     if (response.notification === 'message') {
  //   //       store.dispatch({ type: 'GET_NEW_MESSAGE', message: response.message });
  //   //     }
  //   //   });
  //   // });
  //   socket.on('notifications', (response) => {
  //     if (response.notification === 'new message') {
  //       store.dispatch({ type: 'GET_NEW_MESSAGE', message: response.message });
  //     }
  //     if (response.notification === 'new invitation') {
  //       store.dispatch({ type: 'GET_NEW_INVITATION', invitation: response.invitation });
  //     }
  //   });
  //   next(action);
  // }

  if ((action.type === 'ADD_MESSAGE_SUCCESS') && socket) {
    socket.emit('sendMessage', action.message, () => {
      console.log('je suis dans le callback de socket sendMessage dans ADD_MESSAGE_SUCCESS');
      socket.on('notifications', (response) => {
        if (response.notification === 'message') {
          store.dispatch({ type: 'GET_NEW_MESSAGE', message: response.message });
        }
      });
    });
    next(action);
  }
  if ((action.type === 'SEND_INVITATION_SUCCESS') && socket) {
    socket.emit('sendInvitation', action.invitation, () => {
      console.log('je suis dans le callback action socket sendInv dans SEND_INVITATIONS_SUCCESS');
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
