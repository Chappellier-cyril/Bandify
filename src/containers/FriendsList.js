import { connect } from 'react-redux';
import FriendsList from 'src/components/FriendsList';

const mapStateToProps = (state) => ({
  friends: state.users.friends,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: (id, name) => {
    dispatch({ type: 'GET_RECEIVER', id, name });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
