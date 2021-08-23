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

  if (action.type === 'ON_SEARCH_SUBMIT') {
    const state = store.getState();
    const { searchValue } = state.settings;
    const searchSuccessMessage = `Résultats pour ${searchValue}`;

    axios.get(`http://localhost:3000/search?q=${searchValue}`)
      .then((response) => {
        console.log(response.data);
        store.dispatch({ type: 'ON_SEARCH_SUBMIT_SUCCESS', searchedUsers: response.data, searchSuccessMessage });
      });
  }

  next(action);
};

export default searchMiddleware;
