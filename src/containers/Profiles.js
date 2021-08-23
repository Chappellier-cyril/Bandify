import { connect } from 'react-redux';
import Profiles from 'src/components/Profiles';

const mapStateToProps = (state) => ({
  users: state.users.users,
  user: state.users.user,
  connectedUserId: state.login.id,
  isLogged: state.login.isLogged,
  isDeleteModalClosed: state.settings.isDeleteModalClosed,
  deleteProfileMessage: state.settings.deleteProfileMessage,
  isProfileDeleted: state.settings.isProfileDeleted,
});

const mapDispatchToProps = (dispatch) => ({
  getOneMember: () => {
    dispatch({ type: 'GET_ONE_MEMBER' });
  },
  onWishToDeleteProfile: () => {
    dispatch({ type: 'DELETE_PROFILE_WISH' });
  },
  onDeleteProfile: () => {
    dispatch({ type: 'SAID_YES_TO_DELETE_PROFILE' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
