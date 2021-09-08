import { connect } from 'react-redux';
import NavbarDesktop from 'src/components/NavbarDesktop';

const mapStateToProps = (state) => ({
  connectedUserId: state.login.id,
  isLogged: state.login.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch({ type: 'ON_LOGOUT' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarDesktop);
