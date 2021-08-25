export const initialState = {
  id: null,
  email: '',
  password: '',
  isLogged: false,
  isError: false,
  passwordShown: false,
  token: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_INPUT_LOGIN':
      return {
        ...state,
        [action.key]: action.value.replace(/\s/g, ''),
      };

    case 'ON_PASSWORD_TOGGLE':
      return {
        ...state,
        passwordShown: !state.passwordShown,
      };

    case 'ON_LOGIN_SUCCESS': {
      return {
        ...state,
        id: action.data.id,
        isLogged: true,
        isError: false,
        email: action.data.email,
        token: action.data.token,
      };
    }
    case 'RECONNECT_USER':
      return {
        ...state,
        id: action.user.id,
        email: action.user.email,
        isLogged: true,
        token: action.user.token,
      }
    case 'ON_LOGIN_ERROR':
      return {
        ...state,
        isError: true,
        isLogged: false,
        password: '',
      };

    case 'ON_LOGOUT': {
        // On clear le localStorage à la deconnexion du user
        localStorage.clear();
      return {
        ...state,
        isLogged: false,
        isError: false,
        email: '',
        password: '',
        };
      }
    case 'ON_DELETE_PROFILE_SUCCESS':
      return {
        ...state,
        id: null,
        email: '',
        password: '',
        isLogged: false,
        isError: false,
        passwordShown: false,
        token: null,
      };

    default:
      return state;
  }
};

export default reducer;
