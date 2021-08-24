export const initialState = {
  isMenuOpen: false,
  isFiltersOpen: true,
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
  city: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_IS_OPEN_MENU':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    case 'SET_IS_FILTERS_OPEN':
      return {
        ...state,
        isFiltersOpen: !state.isFiltersOpen,
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
        isProfileDeleted: true,
        isDeleteModalClosed: true,
        deleteProfileMessage: 'Votre profil a bien été supprimé',
      };
    case 'ON_SEARCH_SUBMIT_SUCCESS':
      return {
        ...state,
        searchMessage: action.searchMessage,
        searchValue: '',
      };
    case 'GET_MEMBERS_SUCCESS':
      // Lors d'une action ON_RESET_FILTERS, on remet tout à vide
      return {
        ...state,
        searchMessage: '',
      };
    default:
      return state;
  }
};

export default reducer;
