import { connect } from 'react-redux';
import Home from 'src/components/Home';

const mapStateToProps = (state) => ({
  users: state.users.users,
  isLogged: state.login.isLogged,
  searchValue: state.users.searchValue,
  user: state.users.user,
  searchedUsers: state.users.searchedUsers,
  resultsMessage: state.settings.resultsMessage,
  searchErrorMessage: state.settings.searchErrorMessage,
  loginId: state.login.id,
  isLoading: state.settings.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getMembers: () => {
    dispatch({ type: 'GET_MEMBERS' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
