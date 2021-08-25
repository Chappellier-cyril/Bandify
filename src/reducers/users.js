import usersData from 'src/data/users';

export const initialState = {
  // users = ARRAY
  users: usersData,
  // user = OBJECT
  user: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    user_description: '',
    email: '',
    password: '',
    city: '',
    code: '',
    departement: {
      code: '',
      nom: '',
    },
    region: {
      code: '',
      nom: '',
    },
    instruments: [{}],
    styles: [0],
  },
  editPhoto: false,
  editName: false,
  editCity: false,
  editBirthdate: false,
  editInstruments: false,
  editStyles: false,
  editEmail: false,
  editPassword: false,
  editDescription: false,
  searchedUsers: [],
  success: false,
  error: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_MEMBERS_SUCCESS':
      return {
        ...state,
        users: action.users,
        searchedUsers: [],
      };
    case 'GET_ONE_MEMBER_SUCCESS':
      return {
        ...state,
        user: action.user,
      };
    case 'ON_SEARCH_SUBMIT_SUCCESS':
      return {
        ...state,
        // pas le choix, faut passer par le reducer Users
        // les users deviennent filtrés en fonction de la query de searchBar
        searchedUsers: action.searchedUsers,
      };
    case 'ON_DELETE_PROFILE_SUCCESS':
      {
        localStorage.clear();
        return {
          ...state,
          users: usersData,
          user: {},
        };
      }
    case 'EDIT_FORM_TOGGLE':
      return {
        ...state,
        [action.key]: !state[action.key],
      };
    case 'CHANGE_INPUT_MODIFY_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          [action.key]: action.value,
        },
      };
    case 'PHOTO_MODIFIED_SUCCESS':
      return {
        ...state,
        success: true,
        editPhoto: false,
      };
    case 'PHOTO_MODIFIED_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'NAME_MODIFIED_SUCCESS':
      return {
        ...state,
        editName: false,
        user: {
          ...state.user,
          firstname: action.data.firstname,
          lastname: action.data.lastname,
        },
      };
    case 'NAME_MODIFIED_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'EMAIL_MODIFIED_SUCCESS':
      return {
        ...state,
        editEmail: false,
        user: {
          ...state.user,
          email: action.data.email,
        },
      };
    case 'EMAIL_MODIFIED_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'BIRTHDATE_MODIFIED_SUCCESS':
      return {
        ...state,
        editBirthdate: false,
        user: {
          ...state.user,
          birthdate: action.data.birthdate,
        },
      };
    case 'BIRTHDATE_MODIFIED_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'DESCRIPTION_MODIFIED_SUCCESS':
      return {
        ...state,
        editDescription: false,
        user: {
          ...state.user,
          user_description: action.data.user_description,
        },
      };
    case 'DESCRIPTION_MODIFIED_ERROR':
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
