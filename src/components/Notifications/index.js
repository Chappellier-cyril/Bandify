import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Notifications = ({
  notifications,
  isNotificationsOpen,
  toggleIsNotificationsOpen,
  getCurrentUser,
}) => (
  <div className={`notifications__container ${!isNotificationsOpen && 'notifications__isHidden'}`}>
    <button type="button" onClick={toggleIsNotificationsOpen} className="close-menu-btn">
      <i className="fas fa-times" />
    </button>
    <ul className="notifications__ul">
      {notifications.length > 0
        && notifications.map((n) => {
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
                className="notifications__li"
                key={n.message.id}
                onClick={() => getCurrentUser(n.message.Sender.id, n.message.Sender.firstname)}
                title="Lire le message"
              >
                <p className="notifications__li--message">Vous avez reçu 1 message de {`${n.message.Sender.firstname} ${n.message.Sender.lastname}`}</p>
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
};

export default Notifications;
