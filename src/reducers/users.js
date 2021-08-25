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
    user_password: '',
    city: {
      city_name: '',
    },
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
    profil_image: '',
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
  error: '',
  city: '',
  code: '',
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
      // On clear le localStorage lors d'une suppression d'un profil
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
        user: {
          ...state.user,
          user_password: '',
        },
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
        user: {
          ...state.user,
          profil_image: action.data.profil_image,
        },
        editPhoto: false,
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
    case 'EMAIL_MODIFIED_SUCCESS':
      return {
        ...state,
        editEmail: false,
        user: {
          ...state.user,
          email: action.data.email,
        },
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
    case 'DESCRIPTION_MODIFIED_SUCCESS':
      return {
        ...state,
        editDescription: false,
        user: {
          ...state.user,
          user_description: action.data.user_description,
        },
      };
    case 'PASSWORD_MODIFIED_SUCCESS':
      return {
        ...state,
        editPassword: false,
        user: {
          ...state.user,
          user_password: '',
        },
      };
    case 'SUBMIT_MODIFIED_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'CHANGE_CITY_INPUT':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'CITY_MODIFIED_SUCCESS':
      return {
        ...state,
        editCity: false,
        user: {
          ...state.user,
          city: {
            ...state.city,
            city_name: state.user.city,
          },
        },
        code: action.data.city_code,
      };

    default:
      return state;
  }
};

export default reducer;
