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
    // Comme pour l'action juste en dessous (DENY_INVITATION),
    // on récupère l'index de la notif a actualiser
    const invitationId = action.id;
    const { futureFriend } = action;
    const invitationIndex = state.socket.notifications
      .find((notif) => notif.invitation.id === invitationId && notif.invitation.status === 0);
    const invIndex = state.socket.notifications.indexOf(invitationIndex);

    const options = {
      method: 'PATCH',
      url: `${process.env.BANDIFY_API_URL}/invitations/${invitationId}`,
      // on la passe à status 1 ==> acceptée (0 = pending)
      data: {
        status: 1,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({
          type: 'ON_ACCEPT_INVITATION_SUCCESS', invitation: response.data, futureFriend, invIndex,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (action.type === 'ON_DENY_INVITATION') {
    // on récupère l'id de l'invitation (obtenue dans le composant directement au onClick)
    const invitationId = action.id;
    // on cherche a trouver l'index de l'invitation dans le tableau notifications du socket reducer
    // afin de filtrer la bonne invitation à supprimer

    // d'abord on find l'index
    const invitationIndex = state.socket.notifications
      .find((notif) => notif.invitation.id === invitationId && notif.invitation.status === 0);
    // puis on récupère l'index qu'on stocke dans invIndex
    const invIndex = state.socket.notifications.indexOf(invitationIndex);

    // On fait la même chose pour le tableau de pendingInvitations dans le users reducer
    const pendingInvitationIndex = state.users.pendingInvitations
      .find((inv) => inv.id === invitationId && inv.status === 0);
    // on récup l'index dans le tableau, on le stocke
    const pendingInvIndex = state.users.pendingInvitations.indexOf(pendingInvitationIndex);
    // on delete dans la bdd
    const options = {
      method: 'DELETE',
      url: `${process.env.BANDIFY_API_URL}/invitations/${invitationId}`,
    };
    // on dispatch au reducer pour actualiser nos différents tableaux dans users et socket reducer
    axios(options)
      .then(() => {
        store.dispatch({
          type: 'ON_DENY_INVITATION_SUCCESS', invIndex, pendingInvIndex,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  next(action);
};

export default invitationMiddleware;
