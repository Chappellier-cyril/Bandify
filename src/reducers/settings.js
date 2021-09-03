export const initialState = {
  isLoading: false,
  isMenuOpen: false,
  isProfileMenuOpen: false,
  isFiltersOpen: false,
  isChatroomOpen: false,
  isNotificationsOpen: false,
  isDeleteModalClosed: true,
  deleteProfileMessage: '',
  isProfileDeleted: false,
  // SEARCH
  searchValue: '',
  searchMessage: '',
  instruments: [],
  levels: [{}],
  musicstyles: [{}],
  instrument: '',
  level: '',
  musicstyle: '',
  // users searched from searchbar
  searchedUsers: [],
  city: '',
  departments: [{}],
  department: '',
  regions: [{}],
  region: '',
  // chatroom
  isMessagesOpen: false,
  isFriendsListOpen: true,
  messageInputValue: '',
  // Tableau où on stock nos messages au fur et à mesure
  messages: [],
  id: null,
  content: '',
  status: false,
  sender_id: null,
  reicever_id: null,
  reicever_name: '',
  from: null,
  isDeleteFriendModalOpen: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'HIDE_ALL_WINDOWS':
      return {
        ...state,
        isMenuOpen: false,
        isChatroomOpen: false,
        isNotificationsOpen: false,
        isFiltersOpen: false,
      };
    case 'SET_IS_OPEN_MENU':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
        isChatroomOpen: false,
        isNotificationsOpen: false,
        isFiltersOpen: false,
      };
    case 'SET_IS_OPEN_CHATROOM':
      return {
        ...state,
        isChatroomOpen: !state.isChatroomOpen,
        isNotificationsOpen: false,
        isMenuOpen: false,
        isFiltersOpen: false,
      };
    case 'SET_IS_OPEN_NOTIF':
      return {
        ...state,
        isNotificationsOpen: !state.isNotificationsOpen,
        // isChatroomOpen: false,
        isMenuOpen: false,
      };
    case 'TOGGLE_PROFILE_MENU':
      return {
        ...state,
        isProfileMenuOpen: !state.isProfileMenuOpen,
      };
    case 'SET_IS_FILTERS_OPEN':
      return {
        ...state,
        isFiltersOpen: !state.isFiltersOpen,
        isNotificationsOpen: false,
        isChatroomOpen: false,
        isMenuOpen: false,
      };
    case 'SET_IS_OPEN_MESSAGES':
      return {
        ...state,
        isMessagesOpen: true,
        isFriendsListOpen: false,
      };
    case 'SET_IS_OPEN_FRIENDS_LIST':
      return {
        ...state,
        isFriendsListOpen: true,
        isMessagesOpen: false,
      };
    case 'GET_INSTRUMENTS_SUCCESS':
      return {
        ...state,
        instruments: action.instruments,
      };
    case 'GET_LEVELS_SUCCESS':
      return {
        ...state,
        levels: action.levels,
      };
    case 'GET_MUSIC_STYLES_SUCCESS':
      return {
        ...state,
        musicstyles: action.musicstyles,
      };
    case 'SET_SELECT_INPUT_VALUE':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'SET_SEARCH_INPUT_VALUE':
      return {
        ...state,
        searchValue: action.searchValue,
      };
    case 'ON_LOGOUT':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
        isChatroomOpen: false,
        isMessagesOpen: false,
        messages: [],
      };
    case 'DELETE_PROFILE_WISH':
      return {
        ...state,
        isDeleteModalClosed: !state.isDeleteModalClosed,
      };
    case 'ON_DELETE_PROFILE_SUCCESS':
      return {
        ...state,
        isMenuOpen: false,
        isFiltersOpen: false,
        isDeleteModalClosed: true,
        instruments: [{}],
        levels: [{}],
        musicstyles: [{}],
        instrument: '',
        level: '',
        musicstyle: '',
        // Home's search input
        searchValue: '',
        // users searched from searchbar
        searchedUsers: [],
        searchMessage: '',
      };
    case 'ON_SEARCH_SUBMIT_SUCCESS':
      return {
        ...state,
        searchMessage: action.searchMessage,
        searchValue: '',
      };
    case 'GET_MEMBERS_SUCCESS':
      // Lors d'une action ON_RESET_FILTERS, on vide les filtres
      return {
        ...state,
        // searchMessage: '',
        instrument: '',
        level: '',
        musicstyle: '',
        city: '',
        department: '',
        region: '',
        isLoading: false,
      };
    case 'GET_ONE_MEMBER_SUCCESS':
      return { ...state, isLoading: false };
    case 'GET_DEPARTMENTS_SUCCESS':
      return {
        ...state,
        departments: action.departments,
      };
    case 'GET_REGIONS_SUCCESS':
      return {
        ...state,
        regions: action.regions,
      };
    case 'SET_MESSAGE_INPUT_VALUE':
      return {
        ...state,
        messageInputValue: action.messageInputValue,
      };
    case 'GET_MESSAGES_SUCCESS': {
      return {
        ...state,
        messages: action.messages,
      };
    }
    case 'GET_NEW_MESSAGE':
    {
      return {
        ...state,
        messages: [
          ...state.messages,
          { ...action.notif.messages[0] },
        ],
      };
    }
    case 'ADD_MESSAGE_SUCCESS': {
      // si la value de l'input renseignée n'est pas vide, on soumet le form
      if (state.messageInputValue.trim() !== '') {
        return {
          ...state,
          // ON compare les clefs dans le state
          // avec les clefs qu'il y a dans le tableau message du state
          messages: [
            ...state.messages,
            {
              id: action.message.id,
              content: state.messageInputValue,
              status: false,
              sender_id: action.message.sender_id,
              reicever_id: state.reicever_id,
            },
          ],
          messageInputValue: '',
        };
      }
      // sinon, string vide ==> on return le state, pas de soumission du form
      return state;
    }
    case 'GET_RECEIVER': {
      return {
        ...state,
        reicever_id: action.id,
        reicever_name: action.name,
        isChatroomOpen: true,
        isMessagesOpen: true,
        isFriendsListOpen: false,
        isNotificationsOpen: false,
      };
    }

    case 'ON_LOGIN_SUCCESS':
      return {
        ...state,
        sender_id: Number(action.data.id),
      };

    case 'RECONNECT_USER':
      return {
        ...state,
        sender_id: Number(action.user.id),
      };

    case 'DELETE_FRIEND_WISH':
      return {
        ...state,
        isDeleteFriendModalOpen: !state.isDeleteFriendModalOpen,
      };

    case 'DELETE_FROM_FRIENDLIST_SUCCESS':
      return {
        ...state,
        isDeleteFriendModalOpen: false,
      };

    default:
      return state;
  }
};

export default reducer;
