import usersData from 'src/data/users';

export const initialState = {
  // users = ARRAY
  users: usersData,
  // user = OBJECT
  user: {},
  // Home's search input
  searchValue: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_SEARCH_INPUT_VALUE':
      return {
        ...state,
        searchValue: action.searchValue,
      };

    case 'GET_MEMBERS_SUCCESS':
      return {
        ...state,
        users: action.users,
      };

    case 'GET_ONE_MEMBER_SUCCESS':
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
