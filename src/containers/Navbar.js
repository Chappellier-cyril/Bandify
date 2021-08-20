import { connect } from 'react-redux';
import Navbar from 'src/components/Navbar';

const mapStateToProps = (state) => ({
  user: state.users.user,
  isMenuOpen: state.global.isMenuOpen,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch({ type: 'ON_LOGOUT' });
  },
  hideMenu: () => {
    dispatch({ type: 'SET_IS_OPEN_MENU' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
