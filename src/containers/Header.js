import { connect } from 'react-redux';
import Header from 'src/components/Header';

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch({ type: 'ON_LOGOUT' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
