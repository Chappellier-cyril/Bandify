import axios from 'axios';

const invitationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'SEND_INVITATION_TO_USER') {
    console.log('request_user_id', state.settings.sender_id);
    console.log('response_user_id', action.id);
    const options = {
      method: 'POST',
      url: 'http://localhost:3000/invitations',
      data: {
        status: 0,
        request_user_id: state.settings.sender_id,
        response_user_id: action.id,
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
