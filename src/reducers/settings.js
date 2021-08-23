export const initialState = {
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
  deleteProfileMessage: '',
  isProfileDeleted: false,
  // users searched from searchbar
  searchedUsers: [],
  searchSuccessMessage: '',
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
<<<<<<< HEAD
    case 'DELETE_PROFILE_WISH':
      return {
        ...state,
        isDeleteModalClosed: !state.isDeleteModalClosed,
      };
    case 'ON_DELETE_PROFILE_SUCCESS':
      return {
        ...state,
        isProfileDeleted: true,
        deleteProfileMessage: 'Votre profil a bien été supprimé',
=======

    case 'ON_SEARCH_SUBMIT_SUCCESS':
      return {
        ...state,
        searchedUsers: action.searchedUsers,
        searchSuccessMessage: action.searchSuccessMessage,
        searchValue: '',
>>>>>>> 19c37d52dcd4a254e5d2d805ebe87c7b964ee08d
      };
    default:
      return state;
  }
};

export default reducer;
