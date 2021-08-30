export const initialState = {
  online: [],
  notifications: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_ONLINE_MEMBERS': {
      return {
        ...state,
        online: action.online,
      };
    }
    case 'GET_ALL_NOTIFICATIONS': {
      /*
        Au Login et au reconnect quand on fait l'appel à la BDD :
          *récupérer toutes les invitations de status pending ou le user est invitation.toMember
            copier chacune de ces invitations dans le tableau notifications
          *récupérer tous les messages de status unread ou le receiver est message.reicever_id
            copier chacune de ces messages dans le tableau notifications
      */
      return {
        ...state,
        notifications: [
          ...state.notifications,
          action.notif,
        ],
      };
    }
    case 'GET_NEW_MESSAGE': {
      /*
        A chaque nouveau message que je reçois via le socket 'new message'
        je l'ajoute au notifications. Cette action provient du middleware socket et
        passe aussi dans le reducer settings pour ajouter le messages au tableau des messages
      */
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            notification: 'message',
            message: { ...action.message },
          },
        ],
      };
    }
    case 'GET_NEW_INVITATION': {
      /*
        A chaque nouvelle invitation que je reçois via le socket 'new invitation'
        je l'ajoute au notifications. Cette action provient du middleware socket et
        passe aussi dans le reducer settings pour ajouter l'invitation au tableau des invitations
      */
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            notification: 'invitation',
            invitation: { ...action.invitation },
          },
        ],
      };
    }
    case 'DELETE_NOTIFICATION': {
      const filteredNotif = state.notifications.filter((n, i) => i === action.index);
      return {
        ...state,
        notifications: filteredNotif,
      };
    }
    default:
      return state;
  }
};

export default reducer;
