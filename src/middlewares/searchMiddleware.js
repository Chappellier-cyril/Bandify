import axios from 'axios';

const searchMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_INSTRUMENTS') {
    axios.get(`${process.env.BANDIFY_API_URL}/instruments`)
      .then((response) => {
        store.dispatch({ type: 'GET_INSTRUMENTS_SUCCESS', instruments: response.data });
      });
  }

  if (action.type === 'GET_LEVELS') {
    axios.get(`${process.env.BANDIFY_API_URL}/levels`)
      .then((response) => {
        store.dispatch({ type: 'GET_LEVELS_SUCCESS', levels: response.data });
      });
  }

  if (action.type === 'GET_MUSIC_STYLES') {
    axios.get(`${process.env.BANDIFY_API_URL}/musicstyles`)
      .then((response) => {
        store.dispatch({ type: 'GET_MUSIC_STYLES_SUCCESS', musicstyles: response.data });
      });
  }

  if (action.type === 'GET_DEPARTMENTS') {
    axios.get(`${process.env.BANDIFY_API_URL}/departments`)
      .then((response) => {
        store.dispatch({ type: 'GET_DEPARTMENTS_SUCCESS', departments: response.data });
      });
  }

  if (action.type === 'GET_REGIONS') {
    axios.get(`${process.env.BANDIFY_API_URL}/regions`)
      .then((response) => {
        store.dispatch({ type: 'GET_REGIONS_SUCCESS', regions: response.data });
      });
  }

  if (action.type === 'ON_SEARCH_SUBMIT') {
    const state = store.getState();
    const {
      instrument, level, musicstyle, city, department, region, searchValue,
    } = state.settings;

    const requestParameters = {
      instrument,
      level,
      musicstyle,
      city,
      department,
      region,
      searchValue,
    };

    const baseResults = 'Résultat(s) pour ';
    const baseError = 'Désolé, aucun résultat ne correspond à ';

    axios.get(`${process.env.BANDIFY_API_URL}/search`, { params: requestParameters })
      .then((response) => {
        // aucun resultat trouvés, on dispatch le msg d'erreur
        if (response.data.length === 0) {
          if (instrument) {
            store.dispatch({ type: 'ON_SEARCH_SUBMIT_ERROR', searchErrorMessage: `${baseError} ${instrument}` });
          }
          if (instrument && level) {
            store.dispatch({ type: 'ON_SEARCH_SUBMIT_ERROR', searchErrorMessage: `${baseError} ${instrument} - ${level}` });
          }
          if (musicstyle) {
            store.dispatch({ type: 'ON_SEARCH_SUBMIT_ERROR', searchErrorMessage: `${baseError} ${musicstyle}` });
          }
          if (city) {
            store.dispatch({ type: 'ON_SEARCH_SUBMIT_ERROR', searchErrorMessage: `${baseError} ${city}` });
          }
          if (department && !city) {
            store.dispatch({ type: 'ON_SEARCH_SUBMIT_ERROR', searchErrorMessage: `${baseError} ${department}` });
          }
          if (region && !city && !department) {
            store.dispatch({ type: 'ON_SEARCH_SUBMIT_ERROR', searchErrorMessage: `${baseError} ${region}` });
          }
          if (searchValue) {
            store.dispatch({ type: 'ON_SEARCH_SUBMIT_ERROR', searchErrorMessage: `${baseError} ${searchValue}` });
            if (searchValue.trim() === '') {
              store.dispatch({
                type: 'ON_SEARCH_SUBMIT_ERROR',
                searchErrorMessage: 'Renseignez un prénom, un nom ou les deux pour lancer la recherche',
              });
            }
          }
        }
        // On a des résultats, on dispatch le tableau de users en fonction de la recherche filtée
        if (instrument) {
          store.dispatch({ type: 'ON_SEARCH_SUBMIT_SUCCESS', searchedUsers: response.data, resultsMessage: `${baseResults} ${instrument}` });
        }
        if (instrument && level) {
          store.dispatch({ type: 'ON_SEARCH_SUBMIT_SUCCESS', searchedUsers: response.data, resultsMessage: `${baseResults} ${instrument} - ${level}` });
        }
        if (musicstyle) {
          store.dispatch({ type: 'ON_SEARCH_SUBMIT_SUCCESS', searchedUsers: response.data, resultsMessage: `${baseResults} ${musicstyle}` });
        }
        if (city) {
          store.dispatch({ type: 'ON_SEARCH_SUBMIT_SUCCESS', searchedUsers: response.data, resultsMessage: `${baseResults} ${city}` });
        }
        if (department && !city) {
          store.dispatch({ type: 'ON_SEARCH_SUBMIT_SUCCESS', searchedUsers: response.data, resultsMessage: `${baseResults} ${department}` });
        }
        if (region && !city && !department) {
          store.dispatch({ type: 'ON_SEARCH_SUBMIT_SUCCESS', searchedUsers: response.data, resultsMessage: `${baseResults} ${region}` });
        }
        if (searchValue) {
          store.dispatch({ type: 'ON_SEARCH_SUBMIT_SUCCESS', searchedUsers: response.data, resultsMessage: `${baseResults} ${searchValue}` });
        }
      });
  }

  // Si on a cliqué sur Réinitialiser dans la searchBar, on dispatch au reducer.
  // Les users ne sont plus filtrés et on récupère de nouveau TOUS les users via l'api
  if (action.type === 'ON_RESET_FILTERS') {
    axios.get(`${process.env.BANDIFY_API_URL}/members`)
      .then((response) => {
        store.dispatch({ type: 'GET_MEMBERS_SUCCESS', users: response.data });
      });
  }

  next(action);
};

export default searchMiddleware;
