import usersData from 'src/data/users';

export const initialState = {
  // users = ARRAY
  users: usersData,
  // user = OBJECT
  user: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    user_description: '',
    email: '',
    user_password: '',
    city: {
      city_name: '',
      department_code: '',
    },
    code: '',
    departement: {
      code: '',
      nom: '',
    },
    region: {
      code: '',
      nom: '',
    },
    instruments: [{}],
    sounds: [],
    styles: [{}],
    profil_image: '',
  },
  friends: [],
  pendingInvitations: [],
  acceptedInvitations: [],
  isEditing: false,
  editPhoto: false,
  editName: false,
  editCity: false,
  editBirthdate: false,
  editInstruments: false,
  editStyles: false,
  editEmail: false,
  editPassword: false,
  editDescription: false,
  searchedUsers: [],
  error: '',
  city: '',
  code: '',
  instruments: [{}],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_MEMBERS_SUCCESS':
      return {
        ...state,
        users: action.users,
        searchedUsers: [],
      };
    case 'GET_ONE_MEMBER_SUCCESS':
      return {
        ...state,
        user: action.user,
      };
    case 'ON_SEARCH_SUBMIT_SUCCESS':
      return {
        ...state,
        // pas le choix, faut passer par le reducer Users
        // les users deviennent filtrés en fonction de la query de searchBar
        searchedUsers: action.searchedUsers,
      };
    case 'ON_SEARCH_SUBMIT_ERROR':
      return {
        ...state,
        searchedUsers: action.searchedUsers,
      };
    case 'ON_DELETE_PROFILE_SUCCESS':
    {
      // On clear le localStorage lors d'une suppression d'un profil
      localStorage.clear();
      return {
        ...state,
        users: usersData,
        user: {
          ...initialState.user,
        },
      };
    }
    case 'ADD_NEW_MEMBER':
      return {
        ...state,
        users: [
          ...state.users,
          action.newMember,
        ],
      };
    case 'EDIT_FORM_TOGGLE':
      return {
        ...state,
        [action.key]: !state[action.key],
        user: {
          ...state.user,
          user_password: '',
        },
      };
    case 'TOGGLE_IS_EDITING':
      return {
        ...state,
        isEditing: !state.isEditing,
      };
    case 'CHANGE_INPUT_MODIFY_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          [action.key]: action.value,
        },
      };
    case 'PHOTO_MODIFIED_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          profil_image: action.user.profil_image,
        },
        editPhoto: false,
      };
    case 'SOUND_ADDED_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          sounds: [
            ...state.user.sounds, action.sound,
          ],
        },
        editSound: false,
      };
    case 'NAME_MODIFIED_SUCCESS':
      return {
        ...state,
        editName: false,
        user: {
          ...state.user,
          firstname: action.data.firstname,
          lastname: action.data.lastname,
        },
      };
    case 'EMAIL_MODIFIED_SUCCESS':
      return {
        ...state,
        editEmail: false,
        user: {
          ...state.user,
          email: action.data.email,
        },
      };
    case 'BIRTHDATE_MODIFIED_SUCCESS':
      return {
        ...state,
        editBirthdate: false,
        user: {
          // isMenuOpen: !state.isMenuOpen,
          ...state.user,
          birthdate: action.data.birthdate,
        },
      };
    case 'DESCRIPTION_MODIFIED_SUCCESS':
      return {
        ...state,
        editDescription: false,
        user: {
          ...state.user,
          user_description: action.data.user_description,
        },
      };
    case 'PASSWORD_MODIFIED_SUCCESS':
      return {
        ...state,
        editPassword: false,
        user: {
          ...state.user,
          user_password: '',
        },
      };
    case 'SUBMIT_MODIFIED_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'CHANGE_CITY_INPUT':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'CITY_MODIFIED_SUCCESS':
      return {
        ...state,
        editCity: false,
        user: {
          ...state.user,
          city: {
            ...state.city,
            city_name: action.data.city.city_name,
            department_code: action.data.city.department_code,
          },
        },
        code: action.data.city_code,
      };

    case 'ON_LOGOUT':
      return {
        ...state,
        users: usersData,
      };
    case 'DELETE_INSTRUMENT_ASSOCIATION_SUCCESS': {
      const filteredPlays = state.user.plays.filter((statePlay) => statePlay.id !== action.play.id);
      return {
        ...state,
        user: {
          ...state.user,
          plays: filteredPlays,
        },
      };
    }
    case 'DELETE_STYLE_SUCCESS': {
      const filteredStyles = state.user.styles.filter((stateStyle) => (
        stateStyle.id !== action.style.id));
      return {
        ...state,
        user: {
          ...state.user,
          styles: filteredStyles,
        },
      };
    }
    case 'ADD_NEW_STYLE_SUCCESS': {
      return {
        ...state,
        user: {
          ...state.user,
          styles: [
            ...state.user.styles,
            action.style,
          ],
        },
      }; }
    case 'ADD_INSTRUMENT_ASSOCIATION_SUCCESS': {
      /* ICI on rajoute la nouvelle association d'instrument/level au member en la
      rajoutant dans ses plays */
      return {
        ...state,
      };
    }
    case 'ADD_NEW_INSTRUMENT_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          plays: [
            ...state.user.plays, action.play,
          ]
          ,
        },
      };
    case 'CHANGE_INSTRUMENT_LEVEL_ON_PROFILE': {
      // const copyInstruments = [...state.instruments];
      // const instrumentAlreadyChoose = copyInstruments.find(
      //   ({ instrument }) => instrument === action.value,
      // );
      // if (!instrumentAlreadyChoose || action.key === 'level') {
      //   copyInstruments[action.index] = {
      //     ...copyInstruments[action.index],
      //     [action.key]: action.value,
      //   };
      // }
      return {
        ...state,
        // instruments: copyInstruments,
      };
    }

    case 'ADD_NEW_INSTRUMENT_INPUT_PROFILE':
      return {
        ...state,
        instruments: [...state.instruments, {}],
      };

    case 'REMOVE_INSTRUMENT_INPUT_PROFILE': {
      const copyInstruments = state.instruments.filter((_, i) => i !== action.index);
      return {
        ...state,
        instruments: copyInstruments,
      };
    }

    case 'GET_FRIENDS_SUCCESS':
      return {
        ...state,
        friends: action.friends,
      };

    case 'SEND_INVITATION_SUCCESS': {
      return {
        ...state,
        pendingInvitations: [
          ...state.pendingInvitations,
          action.invitation,
        ],
      };
    }
    case 'GET_NEW_INVITATION': {
      return {
        ...state,
        pendingInvitations: [
          ...state.pendingInvitations,
          action.invitation,
        ],
      };
    }

    case 'GET_PENDING_INVITATIONS_SUCCESS':
      return {
        ...state,
        pendingInvitations: action.pendingInvitations,
      };

    case 'GET_ACCEPTED_INVITATIONS_SUCCESS':
      return {
        ...state,
        acceptedInvitations: action.acceptedInvitations,
      };
    case 'REMOVE_FRIEND': {
      const filteredFriends = state.friends.filter((f) => f.id === action.friend.id);
      const filteredInvitations = state.acceptedInvitations.filter((inv) => (
        inv.to !== action.friend.id || inv.from !== action.friend.id));
      return {
        ...state,
        friends: filteredFriends,
        acceptedInvitations: filteredInvitations,
      };
    }
    case 'DELETE_FROM_FRIENDLIST_SUCCESS': {
      let friendToDelete;
      if (action.invitation.to !== action.userId) friendToDelete = action.invitation.toMember;
      if (action.invitation.from !== action.userId) friendToDelete = action.invitation.fromMember;
      const filteredFriends = state.friends.filter((f) => f.id !== friendToDelete.id);
      const filteredInvitations = state.acceptedInvitations.filter((i) => (
        i.id !== action.invitation.id));
      return {
        ...state,

        acceptedInvitations: filteredInvitations,
        friends: filteredFriends,
      };
    }
    case 'INVITATION_ACCEPTED': {
      const filteredPendingInvitations = state.pendingInvitations.filter((inv) => (
        inv.id !== action.invitation.id));
      return {
        ...state,
        friends: [
          ...state.friends,
          action.invitation.toMember,
        ],
        acceptedInvitations: [
          ...state.acceptedInvitations,
          // on ajoute l'invitation à notre tableau d'invitations accepétées
          action.invitation,
        ],
        pendingInvitations: filteredPendingInvitations,
      };
    }
    case 'ON_ACCEPT_INVITATION_SUCCESS': {
      const filteredPendingInvitations = state.pendingInvitations.filter((inv) => (
        inv.id !== action.invitation.id));
      return {
        ...state,
        friends: [
          ...state.friends,
          // on ajoute le membre à notre tableau de friends
          action.futureFriend,
        ],
        acceptedInvitations: [
          ...state.acceptedInvitations,
          // on ajoute l'invitation à notre tableau d'invitations accepétées
          action.invitation,
        ],
        pendingInvitations: filteredPendingInvitations,
      };
    }
    case 'INVITATION_REFUSED': {
      /* TODO RECUPERER L4INVITATION DANS LE DSIPATCH avant car ici pas d'accés
      à l'invitation à retirer car j'ai besoin de fromMember */
      const filteredInvitations = state.pendingInvitations.filter((inv) => (
        inv.id !== action.invitation.id
      ));
      return {
        ...state,
        pendingInvitations: filteredInvitations,
      };
    }
    case 'ON_DENY_INVITATION_SUCCESS': {
      const filteredInvitations = state.pendingInvitations.filter((inv) => (
        inv.id !== action.invitation.id
      ));
      return {
        ...state,
        pendingInvitations: filteredInvitations,
      };
    }
    default:
      return state;
  }
};

export default reducer;
