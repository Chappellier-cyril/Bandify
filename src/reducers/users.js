import usersData from 'src/data/users';

export const initialState = {
  // users = ARRAY
  users: usersData,
  // user = OBJECT
  user: {
    id: null,
    firstname: '',
    lastname: '',
    age: null,
    email: '',
    password: '',
    description: '',
    profil_image: '',
    city_id: null,
    token: null,
    isLogged: false,
    isError: false,
    passwordShown: false,
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
          [action.key]: action.value.replace(/\s/g, ''),
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

    case 'ON_LOGIN_SUCCESS': {
      return {
        ...state,
        user: {
          ...state.user,
          isLogged: true,
          isError: false,
          id: action.data.id,
          firstname: action.data.firstname,
          lastname: action.data.lastname,
          email: action.data.email,
          age: action.data.birthdate,
          password: action.data.password,
          description: action.data.description,
          profil_image: action.data.profil_image,
          city_id: action.data.city_id,
          token: action.data.token,
        },
      };
    }
    case 'ON_LOGIN_ERROR':
      return {
        ...state,
        user: {
          ...state.user,
          isError: true,
          isLogged: false,
          password: '',
        },
      };
    case 'ON_LOGOUT':
      return {
        ...state,
        users: usersData,
        user: {
          ...state.user,
          isLogged: false,
          isError: false,
          id: null,
          firstname: '',
          lastname: '',
          email: '',
          age: null,
          password: '',
          description: '',
          profil_image: '',
          city_id: null,
          token: null,
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
