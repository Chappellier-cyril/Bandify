import axios from 'axios';

const searchMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_INSTRUMENTS') {
    axios.get('http://localhost:3000/instruments')
      .then((response) => {
        store.dispatch({ type: 'GET_INSTRUMENTS_SUCCESS', instruments: response.data });
      });
  }

  if (action.type === 'GET_LEVELS') {
    axios.get('http://localhost:3000/levels')
      .then((response) => {
        store.dispatch({ type: 'GET_LEVELS_SUCCESS', levels: response.data });
      });
  }

  if (action.type === 'GET_MUSIC_STYLES') {
    axios.get('http://localhost:3000/musicstyles')
      .then((response) => {
        store.dispatch({ type: 'GET_MUSIC_STYLES_SUCCESS', musicstyles: response.data });
      });
  }

  if (action.type === 'GET_DEPARTMENTS') {
    axios.get('http://localhost:3000/departments')
      .then((response) => {
        store.dispatch({ type: 'GET_DEPARTMENTS_SUCCESS', departments: response.data });
      });
  }

  if (action.type === 'GET_REGIONS') {
    axios.get('http://localhost:3000/regions')
      .then((response) => {
        store.dispatch({ type: 'GET_REGIONS_SUCCESS', regions: response.data });
      });
  }

  if (action.type === 'ON_SEARCH_SUBMIT') {
    const state = store.getState();
    // value de la searchBar, stockée dans le reducer settings
    // const { searchValue } = state.settings;
    // const searchMessage = `Résultats pour ${searchValue}`;
    const { instrument, level, musicstyle, city, department, region } = state.settings;

    const requestParameters = {
      instrument,
      level,
      musicstyle,
      city,
      department, 
      region,
    };

    axios.get('http://localhost:3000/search', { params: requestParameters })
    .then((response) => {
      store.dispatch({ type: 'ON_SEARCH_SUBMIT_SUCCESS', searchedUsers: response.data });
    });

  }

  // Si on a cliqué sur Réinitialiser dans la searchBar, on dispatch au reducer.
  // Les users ne sont plus filtrés et on récupère de nouveau TOUS les users via l'api
  if (action.type === 'ON_RESET_FILTERS') {
    axios.get('http://localhost:3000/members')
      .then((response) => {
        store.dispatch({ type: 'GET_MEMBERS_SUCCESS', users: response.data });
      });
  }

  next(action);
};

export default searchMiddleware;
