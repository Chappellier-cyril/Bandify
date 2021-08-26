import axios from 'axios';

const chatMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_MESSAGES') {
    axios.get('http://localhost:3000/messages')
      .then((response) => {
        store.dispatch({ type: 'GET_MESSAGES_SUCCESS', messages: response.data });
      });
  }
  if (action.type === 'ON_MESSAGE_SUBMIT') {
    const state = store.getState();

    const options = {
      method: 'POST',
      url: 'http://localhost:3000/messages',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: state.settings.id,
        content: state.settings.messageInputValue,
        status: state.settings.status,
        sender_id: state.login.id,
        reicever_id: state.settings.reicever_id,
      },

    };
    console.log('receiverId dans chatMiddleware: ', state.settings.reicever_id);
    console.log('connectedUserId dans chatMiddleware: ', state.login.id);
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'ADD_MESSAGE_SUCCESS', message: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  next(action);
};

export default chatMiddleware;
