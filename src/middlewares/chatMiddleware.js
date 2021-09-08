import axios from 'axios';

const chatMiddleware = (store) => (next) => (action) => {
  if (action.type === 'ON_MESSAGE_SUBMIT') {
    const state = store.getState();

    const options = {
      method: 'POST',
      url: `${process.env.BANDIFY_API_URL}/members/${state.login.id}/messages`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: state.settings.id,
        content: state.settings.messageInputValue,
        status: state.settings.status,
        sender_id: state.settings.sender_id,
        reicever_id: state.settings.reicever_id,
      },

    };

    axios(options)
      .then((response) => {
        store.dispatch({ type: 'ADD_MESSAGE_SUCCESS', message: response.data });
      });
  }
  next(action);
};

export default chatMiddleware;
