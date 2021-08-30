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
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
