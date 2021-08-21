import { connect } from 'react-redux';
import Profiles from 'src/components/Profiles';

const mapStateToProps = (state) => ({
  users: state.users.users,
  user: state.users.user,
  connectedUserId: state.login.id,
  isLogged: state.login.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  getOneMember: () => {
    dispatch({ type: 'GET_ONE_MEMBER' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
