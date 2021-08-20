import { connect } from 'react-redux';
import Home from 'src/components/Home';

const mapStateToProps = (state) => ({
  users: state.users.users,
  user: state.users.user,
});

const mapDispatchToProps = (dispatch) => ({
  getMembers: () => {
    dispatch({ type: 'GET_MEMBERS' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
