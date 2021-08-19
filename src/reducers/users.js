import usersData from 'src/data/users';

export const initialState = {
  // users = ARRAY
  users: usersData,
  // user = OBJECT
  user: {
    isLogged: false,
    isError: false,
    id: null,
    firstname: '',
    lastname: '',
    age: null,
    email: '',
    password: '',
    passwordShown: false,
    description: '',
    profil_image: '',
  },
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

    case 'CHANGE_INPUT_LOGIN':
      return {
        ...state,
        user: {
          ...state.user,
          [action.key]: action.value,
        },
      };

    case 'ON_PASSWORD_TOGGLE':
      return {
        ...state,
        user: {
          ...state.user,
          passwordShown: !state.user.passwordShown,
        },
      };

    case 'ON_LOGIN_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          isLogged: true,
          id: action.data.id,
          firstname: action.data.firstname,
          lastname: action.data.lastname,
          email: action.data.email,
          age: action.data.birthdate,
          password: action.data.user_password,
          description: action.data.user_description,
          profil_image: action.data.profil_image,
        },
      };

    case 'ON_LOGIN_ERROR':
      return {
        ...state,
        user: {
          ...state.user,
          isError: true,
        },
      };

    case 'GET_MEMBERS_SUCCESS':
      return {
        ...state,
        users: action.users,
      };

    default:
      return state;
  }
};

export default reducer;
