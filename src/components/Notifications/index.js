import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Notifications = ({ notifications, isNotificationsOpen }) => (
  <div className={`notifications__container ${!isNotificationsOpen && 'notifications__isHidden'}`}>
    <ul className="notifications__ul">
      <li className="notifications__li">Notif 1 {notifications}</li>
      <li className="notifications__li">Notif 2</li>
      <li className="notifications__li">Notif 3</li>
    </ul>
  </div>
);

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  isNotificationsOpen: PropTypes.bool.isRequired,
};

export default Notifications;
