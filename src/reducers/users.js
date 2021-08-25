import usersData from 'src/data/users';

export const initialState = {
  // users = ARRAY
  users: usersData,
  // user = OBJECT
  user: {},
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
    case 'PHOTO_MODIFIED_SUCCESS':
      return {
        ...state,
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

    default:
      return state;
  }
};

export default reducer;
