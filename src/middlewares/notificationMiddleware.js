import axios from 'axios';

const notificationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const memberId = state.login.id;
  if (memberId) {
    if (action.type === 'GET_PENDING_INVITATIONS_SUCCESS') {
      axios.get(`${process.env.BANDIFY_API_URL}/members/${memberId}/invitations`)
        .then((response) => {
          response.data.map((inv) => {
            const notif = { notification: 'invitation', invitation: inv };
            return (
              store.dispatch({ type: 'GET_ALL_INVITATIONS_NOTIFS', notif, memberId: memberId })
            );
          });
        });
    }
  }
  if (action.type === 'GET_MESSAGES') {
    axios.get(`${process.env.BANDIFY_API_URL}/members/${memberId}/messages`)
      .then((response) => {
        store.dispatch({ type: 'GET_MESSAGES_SUCCESS', messages: response.data });
        response.data.map((msg) => {
          if ((msg.status === false) && (msg.sender_id !== state.login.id)) {
            const notif = { notification: 'message', messages: [msg], sender: msg.Sender };
            return (
              store.dispatch({ type: 'GET_ALL_MESSAGES_NOTIFS', notif, memberId: memberId })
            );
          }
          return null;
        });
      });
  }
  next(action);
};

export default notificationMiddleware;
