import axios from 'axios';

const invitationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'SEND_INVITATION_TO_USER') {
    console.log('from', state.settings.sender_id);
    console.log('to', action.id);
    const options = {
      method: 'POST',
      url: 'http://localhost:3000/invitations',
      data: {
        status: 0,
        from: state.settings.sender_id,
        to: action.id,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'SEND_INVITATION_SUCCESS', invitation: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  next(action);
};

export default invitationMiddleware;
