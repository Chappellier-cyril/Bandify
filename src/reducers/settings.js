export const initialState = {
  isMenuOpen: false,
  isFiltersOpen: false,
  instruments: [{}],
  levels: [{}],
  musicstyles: [{}],
  instrument: '',
  level: '',
  musicstyle: '',
  // Home's search input
  searchValue: '',
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
    default:
      return state;
  }
};

export default reducer;
