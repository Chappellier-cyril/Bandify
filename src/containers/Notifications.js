import { connect } from 'react-redux';
import Notifications from 'src/components/Notifications';

const mapStateToProps = (state) => ({
  notifications: state.socket.notifications,
  isNotificationsOpen: state.settings.isNotificationsOpen,
});

const mapDispatchToProps = (dispatch) => ({
  deleteNotification: (index) => {
    dispatch({ type: 'DELETE_NOTICATION', index });
  },
  toggleIsNotificationsOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_NOTIF' });
  },
  getCurrentUser: (id, name) => {
    dispatch({ type: 'GET_RECEIVER', id, name });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
