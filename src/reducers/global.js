export const initialState = {
  isMenuOpen: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_IS_OPEN_MENU':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    default:
      return state;
  }
};

export default reducer;
