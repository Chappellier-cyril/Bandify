import io from 'socket.io-client';

let socket;

const socketMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  if (((action.type === 'ON_LOGIN_SUCCESS') || (action.type === 'RECONNECT_USER'))) {
    socket = io.connect(`${process.env.BANDIFY_API_URL}`);
    socket.on('online-members', (members) => {
      store.dispatch({ type: 'GET_ONLINE_MEMBERS', online: members.online });
    });
    socket.on('new-member', (newMember) => {
      store.dispatch({ type: 'ADD_NEW_MEMBER', newMember: newMember.newMember });
    });
    socket.emit('isOnline', { id: localStorage.getItem('userId') });
    socket.on('is-typing', (response) => {
      store.dispatch({ type: 'FRIEND_IS_TYPPING', friend: response.from });
    });
    socket.on('is-not-typing', (response) => {
      store.dispatch({ type: 'FRIEND_IS_NOT_TYPPING', friend: response.from });
    });
    socket.on('notifications', (response) => {
      if (response.notification === 'message') {
        const notif = { notification: 'message', messages: [response.message], sender: response.message.Sender };
        store.dispatch({ type: 'GET_NEW_MESSAGE', notif });
      }
      if (response.notification === 'invitation') {
        store.dispatch({ type: 'GET_NEW_INVITATION', invitation: response.invitation });
      }
      if (response.notification === 'new-friend') {
        store.dispatch({ type: 'INVITATION_ACCEPTED', invitation: response.invitation });
      }
      if (response.notification === 'no-friend') {
        // récuperer aussi invitation
        store.dispatch({ type: 'INVITATION_REFUSED', refusedMember: response.refusedMember, invitation: response.invitation });
      }
    });
    socket.on('remove-friend', (friend) => {
      store.dispatch({ type: 'REMOVE_FRIEND', friend });
    });
    next(action);
  }

  if ((action.type === 'ADD_MESSAGE_SUCCESS') && socket) {
    socket.emit('sendMessage', action.message, () => {
      socket.on('notifications', (response) => {
        if (response.notification === 'message') {
          const notif = { notification: 'message', messages: [response.message], sender: response.message.Sender };
          store.dispatch({ type: 'GET_NEW_MESSAGE', notif });
        }
      });
    });
    next(action);
  }
  if ((action.type === 'SEND_I_WRITE') && socket) {
    socket.emit('isTyping', { from: state.login.id, to: state.settings.reicever_id });
    next(action);
  }
  if ((action.type === 'SEND_NO_WRITE') && socket) {
    socket.emit('isNotTyping', { from: state.login.id, to: state.settings.reicever_id });
    next(action);
  }
  if ((action.type === 'SEND_INVITATION_SUCCESS') && socket) {
    socket.emit('sendInvitation', action.invitation, () => {
      socket.on('notifications', (response) => {
        if (response.notification === 'invitation') {
          store.dispatch({ type: 'GET_NEW_INVITATION', invitation: response.invitation });
        }
      });
    });
    next(action);
  }
  if ((action.type === 'ON_ACCEPT_INVITATION_SUCCESS') && socket) {
    socket.emit('invitationAccepted', { futureFriend: action.futureFriend, invitation: action.invitation });
  }
  if ((action.type === 'ON_DENY_INVITATION_SUCCESS') && socket) {
    socket.emit('invitationRefused', { refusedMember: action.refusedMember, invitation: action.invitation });
  }
  if ((action.type === 'DELETE_FROM_FRIENDLIST_SUCCESS') && socket) {
    const friendEmit = state.users.users.find((u) => u.id === state.login.id);
    let friendUser;
    if (action.invitation.to !== friendEmit.id) friendUser = action.invitation.toMember;
    if (action.invitation.from !== friendEmit.id) friendUser = action.invitation.fromMember;
    socket.emit('removeFromFriends', { friendEmit, friendOn: friendUser });
  }
  if (action.type === 'SUBMIT_SUCCESS') {
    console.log('action submit-success');
    socket = io.connect(`${process.env.BANDIFY_API_URL}`);
    socket.emit('newMember', { newMember: action.newMember });
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
