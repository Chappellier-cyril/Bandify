export const initialState = {
  online: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_ONLINE_MEMBERS': {
      return {
        ...state,
        online: action.online,
      };
    }
    default:
      return state;
  }
};

export default reducer;
