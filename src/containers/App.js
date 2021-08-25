import { connect } from 'react-redux';
import App from 'src/components/App';

const mapStateToProps = (state) => ({
  isLogged: state.login.isLogged,

});

const mapDispatchToProps = (dispatch) => ({
  setReconnect: (user) => {
    dispatch({type: 'RECONNECT_USER', user })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
