import { connect } from 'react-redux';
import App from 'src/components/App';

const mapStateToProps = (state) => ({
  isLogged: state.login.isLogged,

});

// On créer une action 'RECONNECT_USER', en lui envoyer dans le payload
// les infos qu'on a dans le "user" (App/UseEffect)
const mapDispatchToProps = (dispatch) => ({
  setReconnect: (user) => {
    dispatch({type: 'RECONNECT_USER', user })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
