import { connect } from 'react-redux';

import Signup from 'src/components/Signup';

const mapStateToProps = (state) => ({
  success: state.signup.success,
  firstName: state.signup.firstName,
  lastName: state.signup.lastName,
  dateOfBirth: state.signup.dateOfBirth,
  description: state.signup.description,
  email: state.signup.email,
  password: state.signup.password,
  city: state.signup.city,
  code: state.signup.code,
  instruments: state.signup.instruments,
  styles: state.signup.styles,
  departement: state.signup.departement,
  region: state.signup.region,
  image: state.signup.image,
  error: state.signup.error,
  instrumentsData: state.settings.instruments,
  levelsData: state.settings.levels,
  musicStylesData: state.settings.musicstyles,
});

const mapDispatchToProps = (dispatch) => ({
  /* fonction générique pour changer les inputs afin d'avoir des composants contrôlées
    @params setState => fonction du useState de l'input contrôlé
    @params event => récupère la valeur de l'input
  */
  onChangeInput: (key, value) => {
    dispatch({
      type: 'CHANGE_INPUT_SIGNUP',
      key,
      value,
    });
  },
  /* fonction pour copié l'instrument ou le level séléctionné dans l'objet associé
    @params e => pour récuperer la target value de l'event;
    @params index => pour récupérer la ligne de l'instrument séléctionné
    @params key => pour choisir l'input instrument ou level
  */
  onSelectInput: (e, index, key) => {
    dispatch({
      type: 'CHANGE_INSTRUMENT_LEVEL',
      key,
      index,
      value: e.target.value,
    });
  },
  // Ajouter un input d'instrument et un input de level
  addNewInputInstrument: () => {
    dispatch({
      type: 'ADD_NEW_INSTRUMENT_INPUT_SIGNUP',
    });
  },
  removeInputInstrument: (index) => {
    dispatch({
      type: 'REMOVE_INSTRUMENT_INPUT_SIGNUP',
      index,
    });
  },
  onStyleInput: (e, index) => {
    dispatch({
      type: 'ADD_MUSIC_STYLE_SIGNUP',
      value: e.target.value,
      index,
    });
  },
  addNewStyle: () => {
    dispatch({
      type: 'ADD_NEW_MUSIC_STYLE_INPUT_SIGNUP',
    });
  },
  removeStyle: (index) => {
    dispatch({
      type: 'REMOVE_MUSIC_STYLE_INPUT_SIGNUP',
      index,
    });
  },
  handleSubmitSignup: (e, image) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_SIGNUP', image });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
