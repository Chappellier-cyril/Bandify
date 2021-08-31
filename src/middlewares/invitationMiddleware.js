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

  if (action.type === 'GET_ACCEPTED_INVITATIONS') {
    const options = {
      method: 'GET',
      url: `${process.env.BANDIFY_API_URL}/members/${myId}/accepted_invitations`,
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'GET_ACCEPTED_INVITATIONS_SUCCESS', acceptedInvitations: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (action.type === 'DELETE_FROM_FRIENDLIST') {
    const invitationId = action.acceptedUser.id;
    const indexAccepted = action.accepted.indexOf(action.acceptedUser);
    const indexFriends = action.friends.indexOf(action.friendUser);
    const options = {
      method: 'DELETE',
      url: `${process.env.BANDIFY_API_URL}/invitations/${invitationId}`,
    };
    axios(options)
      .then(() => {
        store.dispatch({
          type: 'DELETE_FROM_FRIENDLIST_SUCCESS', indexAccepted, indexFriends,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (action.type === 'ON_ACCEPT_INVITATION') {
    const invitationId = action.id;
    const { futureFriend } = action;
    console.log('invitationId à patcher dans le middleware :', invitationId);
    const options = {
      method: 'PATCH',
      url: `http://localhost:3000/invitations/${invitationId}`,
      data: {
        status: 1,
        // from: futureFriend.id,
        // to:
      },
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        store.dispatch({ type: 'ON_ACCEPT_INVITATION_SUCCESS', invitation: response.data, futureFriend });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  next(action);
};

export default invitationMiddleware;
