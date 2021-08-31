import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Notifications = ({
  notifications,
  isNotificationsOpen,
  toggleIsNotificationsOpen,
  getCurrentUser,
  deleteMessagesNotification,
}) => (
  <div className={`notifications__container ${!isNotificationsOpen && 'notifications__isHidden'}`}>
    <div className="notifications__li">
      <button type="button" onClick={toggleIsNotificationsOpen} className="close-menu-btn">
        <i className="fas fa-times" />
      </button>
    </div>

    <ul className="notifications__ul">
      {notifications.length > 0
        && notifications.map((n, i) => {
          if (n.notification === 'invitation') {
            return (
              <li
                className="notifications__li"
                key={n.invitation.id + n.invitation.fromMember.firstname}
              >
                <p>Vous avez reçu une invitation de {`${n.invitation.fromMember.firstname} ${n.invitation.fromMember.lastname}`}</p>
                <button type="button">Accepter</button>
                <button type="button">Supprimer</button>
              </li>
            );
          }
          if (n.notification === 'message') {
            return (
              <li
                className="notifications__li notifications__li--message"
                key={n.messages[0].id + n.sender.id}
                title="Lire le message"
              >
                <p onClick={() => getCurrentUser(n.sender.id, n.sender.firstname)} className="notifications__li--message">Vous avez reçu {n.messages.length} {n.messages.length > 1 ? 'messages' : 'message'} de {`${n.sender.firstname} ${n.sender.lastname}`}</p>
                <button type="button" onClick={() => deleteMessagesNotification(i, n.messages)} className="notifications__li--delete">x</button>
              </li>
            );
          }
          return null;
        })}

    </ul>
  </div>
);
Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  isNotificationsOpen: PropTypes.bool.isRequired,
  toggleIsNotificationsOpen: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  deleteMessagesNotification: PropTypes.func.isRequired,
};

export default Notifications;
