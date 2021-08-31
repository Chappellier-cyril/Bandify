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
    case 'GET_ALL_INVITATIONS_NOTIFS': {
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
    case 'GET_ALL_MESSAGES_NOTIFS': {
      const foundSenderMessagesNotif = state.notifications.find((n) => n.notification === 'message' && (action.notif.sender.id === n.sender.id));
      if (foundSenderMessagesNotif) {
        const newNotifs = state.notifications.filter((n) => {
          if (n.notification === 'message') {
            return action.notif.sender.id !== n.sender.id;
          }
          return n;
        });
        foundSenderMessagesNotif.messages.push(action.notif.messages[0]);
        newNotifs.push(foundSenderMessagesNotif);
        return {
          ...state,
          notifications: [...newNotifs],
        };
      }
      return {
        ...state,
        notifications: [...state.notifications, action.notif],
      };
    }
    case 'GET_NEW_MESSAGE': {
      /*
        A chaque nouveau message que je reçois via le socket 'new message'
        je l'ajoute au notifications. Cette action provient du middleware socket et
        passe aussi dans le reducer settings pour ajouter le messages au tableau des messages
      */
      const foundSenderMessagesNotif = state.notifications.find((n) => n.notification === 'message' && (action.notif.sender.id === n.sender.id));
      if (foundSenderMessagesNotif) {
        const newNotifs = state.notifications.filter((n) => {
          if (n.notification === 'message') {
            return action.notif.sender.id !== n.sender.id;
          }
          return n;
        });
        foundSenderMessagesNotif.messages.push(action.notif.messages[0]);
        newNotifs.push(foundSenderMessagesNotif);
        return {
          ...state,
          notifications: [...newNotifs],
        };
      }
      return {
        ...state,
        notifications: [...state.notifications, action.notif],
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
    case 'UPDATE_MESSAGES_NOTIFICATIONS': {
      const filteredNotif = state.notifications.filter((n, i) => i !== action.index);
      console.log(filteredNotif);
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
