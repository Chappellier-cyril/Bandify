import { connect } from 'react-redux';
import App from 'src/components/App';

const mapStateToProps = (state) => ({
  isLogged: state.login.isLogged,

});

// On créer une action 'RECONNECT_USER', en lui envoyer dans le payload
// les infos qu'on a dans le "user" (App/UseEffect)
const mapDispatchToProps = (dispatch) => ({
  setReconnect: (user) => {
    dispatch({ type: 'RECONNECT_USER', user });
  },
  getInstruments: () => {
    dispatch({ type: 'GET_INSTRUMENTS' });
  },
  getLevels: () => {
    dispatch({ type: 'GET_LEVELS' });
  },
  getMusicStyles: () => {
    dispatch({ type: 'GET_MUSIC_STYLES' });
  },
  getDepartments: () => {
    dispatch({ type: 'GET_DEPARTMENTS' });
  },
  getRegions: () => {
    dispatch({ type: 'GET_REGIONS' });
  },
  getMessages: () => {
    dispatch({ type: 'GET_MESSAGES' });
  },
  getFriends: () => {
    dispatch({ type: 'GET_FRIENDS' });
  },
  getPendingInvitations: () => {
    dispatch({ type: 'GET_PENDING_INVITATIONS' });
  },
  getAcceptedInvitations: () => {
    dispatch({ type: 'GET_ACCEPTED_INVITATIONS' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
