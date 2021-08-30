import axios from 'axios';

const invitationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const myId = state.login.id;

  if (action.type === 'SEND_INVITATION_TO_USER') {
    const options = {
      method: 'POST',
      url: `${process.env.BANDIFY_API_URL}/invitations`,
      data: {
        status: 0,
        from: myId,
        to: action.id,
      },
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        store.dispatch({ type: 'SEND_INVITATION_SUCCESS', invitation: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (action.type === 'GET_FRIENDS') {
    const options = {
      method: 'GET',
      url: `${process.env.BANDIFY_API_URL}/members/${myId}/friends`,
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

  if (action.type === 'GET_PENDING_INVITATIONS') {
    const options = {
      method: 'GET',
      url: `${process.env.BANDIFY_API_URL}/members/${myId}/pending_invitations`,
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'GET_PENDING_INVITATIONS_SUCCESS', pendingInvitations: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  next(action);
};

export default invitationMiddleware;
