import { connect } from 'react-redux';
import NavbarDesktop from 'src/components/NavbarDesktop';

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch({ type: 'ON_LOGOUT' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarDesktop);
