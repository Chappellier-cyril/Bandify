import axios from 'axios';

const notificationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (state.login.id && action.type === ('GET_MESSAGES' || 'GET_PENDING_INVITATIONS_SUCCESS')) {
    const memberId = state.login.id;
    // invitations
    axios.get(`http://localhost:3000/members/${memberId}/invitations`)
      .then((response) => {
        response.data.map((inv) => {
          const notif = { notification: 'invitation', invitation: inv };
          return (
            store.dispatch({ type: 'GET_ALL_NOTIFICATIONS', notif, memberId: memberId })
          );
        });
      });
    // messages
    axios.get(`http://localhost:3000/members/${memberId}/messages`)
      .then((response) => {
        store.dispatch({ type: 'GET_MESSAGES_SUCCESS', messages: response.data });

        response.data.map((msg) => {
          if (msg.status === false) {
            const notif = { notification: 'message', message: msg };
            return (
              store.dispatch({ type: 'GET_ALL_NOTIFICATIONS', notif, memberId: memberId })
            );
          }
          return null;
        });
      });
  }
  next(action);
};

export default notificationMiddleware;
