import { connect } from 'react-redux';
import Notifications from 'src/components/Notifications';

const mapStateToProps = (state) => ({
  notifications: state.socket.notifications,
  isNotificationsOpen: state.settings.isNotificationsOpen,
  pendingInvitations: state.users.pendingInvitations,
  friends: state.users.friends,
});

const mapDispatchToProps = (dispatch) => ({
  deleteMessagesNotification: (index, messages) => {
    dispatch({ type: 'DELETE_MESSAGES_NOTIFICATION', index, messages });
  },
  deleteFriendNotification: (index, invitation) => {
    dispatch({ type: 'DELETE_FRIEND_NOTIFICATION', index, invitation });
  },
  toggleIsNotificationsOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_NOTIF' });
  },
  getCurrentUser: (id, name) => {
    dispatch({ type: 'GET_RECEIVER', id, name });
  },
  onAcceptInvitation: (id, futureFriend) => {
    dispatch({ type: 'ON_ACCEPT_INVITATION', id, futureFriend });
  },
  onDenyInvitation: (id, refusedMember, invitation) => {
    dispatch({
      type: 'ON_DENY_INVITATION', id, refusedMember, invitation,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
