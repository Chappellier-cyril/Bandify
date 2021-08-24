import { connect } from 'react-redux';
import App from 'src/components/App';

const mapStateToProps = (state) => ({
  isLogged: state.login.isLogged,

});

export default connect(mapStateToProps)(App);
