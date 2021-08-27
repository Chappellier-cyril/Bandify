export const initialState = {
  isMenuOpen: false,
  isFiltersOpen: false,
  isChatroomOpen: false,
  isDeleteModalClosed: true,
  deleteProfileMessage: '',
  isProfileDeleted: false,
  // SEARCH
  searchValue: '',
  searchMessage: '',
  instruments: [{}],
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
  messages: [],
  id: null,
  content: '',
  status: false,
  sender_id: null,
  reicever_id: null,
  reicever_name: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_IS_OPEN_MENU':
      return {
        ...state,
        isChatroomOpen: false,
        isMenuOpen: !state.isMenuOpen,
      };
    case 'SET_IS_OPEN_CHATROOM':
      return {
        ...state,
        isChatroomOpen: !state.isChatroomOpen,
      };
    case 'SET_IS_FILTERS_OPEN':
      return {
        ...state,
        isFiltersOpen: !state.isFiltersOpen,
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
      };
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
    case 'GET_MESSAGES_SUCCESS':
    {
      console.log(state);
      console.log('sender_id:', state.sender_id, 'receiver_id', state.reicever_id);
      return {
        ...state,
        messages: action.messages
          .filter((message) => (message.sender_id === state.sender_id
          && message.reicever_id === state.reicever_id)
          || (message.sender_id === state.reicever_id && message.reicever_id === state.sender_id)),
      };
    }
    case 'ADD_MESSAGE_SUCCESS': {
      // si la value de l'input renseignée n'est pas vide, on soumet le form
      if (state.messageInputValue.trim() !== '') {
        return {
          ...state,
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
        isMessagesOpen: true,
      };
    }

    case 'ON_LOGIN_SUCCESS':
      return {
        ...state,
        sender_id: Number(action.data.id),
      };

    default:
      return state;
  }
};

export default reducer;
