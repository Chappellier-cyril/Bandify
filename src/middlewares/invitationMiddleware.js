import axios from 'axios';

const invitationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const myId = state.login.id;

  if (action.type === 'SEND_INVITATION_TO_USER') {
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

  if (action.type === 'GET_FRIENDS') {
    const options = {
      method: 'GET',
      url: `http://localhost:3000/members/${myId}/friends`,
    };
    axios(options)
      .then((response) => {
        const myFriends = response.data.map((f) => {
          if (f.from !== myId) return f.fromMember;
          if (f.to !== myId) return f.toMember;
          return null;
        });
        store.dispatch({ type: 'GET_FRIENDS_SUCCESS', friends: myFriends });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  next(action);
};

export default invitationMiddleware;
