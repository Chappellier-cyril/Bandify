export const initialState = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  description: '',
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
  /* ici styles à 0 car on envoi l'id dans le formulaire du signup donc un number
  contrairement au reducer du user ou on attend de styles un tableau d'objets reçu de la BDD */
  styles: [0],
  success: false,
  error: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_INPUT_SIGNUP':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'ON_LOGIN_SUCCESS': {
      return {
        ...initialState,
      };
    }
    case 'CHANGE_INSTRUMENT_LEVEL': {
      const copyInstruments = [...state.instruments];
      const instrumentAlreadyChoose = copyInstruments.find(
        ({ instrument }) => instrument === action.value,
      );
      if (!instrumentAlreadyChoose || action.key === 'level') {
        copyInstruments[action.index] = {
          ...copyInstruments[action.index],
          [action.key]: action.value,
        };
      }
      return {
        ...state,
        instruments: copyInstruments,
      };
    }
    case 'ADD_NEW_INSTRUMENT_INPUT_SIGNUP':
      return {
        ...state,
        instruments: [...state.instruments, {}],
      };
    case 'REMOVE_INSTRUMENT_INPUT_SIGNUP': {
      const copyInstruments = state.instruments.filter((_, i) => i !== action.index);
      return {
        ...state,
        instruments: copyInstruments,
      };
    }
    case 'ADD_MUSIC_STYLE_SIGNUP': {
      const styleChoose = state.styles.find((styleState) => styleState === Number(action.value));
      if (!styleChoose) {
        const stylesCopy = [...state.styles];
        stylesCopy[action.index] = Number(action.value);
        return {
          ...state,
          styles: stylesCopy,
        };
      }
      return state;
    }
    case 'ADD_NEW_MUSIC_STYLE_INPUT_SIGNUP':
      return {
        ...state,
        styles: [...state.styles, 0],
      };
    case 'REMOVE_MUSIC_STYLE_INPUT_SIGNUP': {
      const copyStyles = state.styles.filter((_, i) => i !== action.index);
      return {
        ...state,
        styles: copyStyles,
      };
    }
    case 'ON_DELETE_PROFILE_SUCCESS':
      return {
        ...state,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        description: '',
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
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...initialState,
        success: true,
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
