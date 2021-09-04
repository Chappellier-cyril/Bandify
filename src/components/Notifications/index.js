import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Link } from 'react-router-dom';

const Notifications = ({
  notifications,
  isNotificationsOpen,
  toggleIsNotificationsOpen,
  getCurrentUser,
  deleteMessagesNotification,
  onAcceptInvitation,
  onDenyInvitation,
}) => (
  <div className={`notifications__container ${!isNotificationsOpen && 'notifications__isHidden'}`}>
    <div className="notifications__close-menu">
      <button type="button" onClick={toggleIsNotificationsOpen} className="close-notif-btn">
        <i className="fas fa-times" />
      </button>
    </div>

    <ul className="notifications__ul">
      {
        notifications.length === 0 && (
          <li className="notifications__li">
            Vous n'avez pas de nouvelles notifications
          </li>
        )
      }
      {notifications.length > 0
        && notifications.map((n, i) => {
          if (n.notification === 'invitation') {
            return (
              <li
                className="notifications__li"
                key={n.invitation.id + n.invitation.fromMember.firstname}
              >
                <p className="notifications__title">Vous avez reçu une invitation de <Link to={`/member/${n.invitation.from}`}>{`${n.invitation.fromMember.firstname} ${n.invitation.fromMember.lastname}`}</Link></p>
                <button className="notifications__accept-btn" type="button" onClick={() => onAcceptInvitation(n.invitation.id, n.invitation.fromMember)}>Accepter</button>
                <button className="notifications__refuse-btn" type="button" onClick={() => onDenyInvitation(n.invitation.id, n.invitation.fromMember, n.invitation)}>Refuser</button>
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
                <p onClick={() => getCurrentUser(n.sender.id, n.sender.firstname)} className="notifications__title">Vous avez reçu {n.messages.length} {n.messages.length > 1 ? 'messages' : 'message'} de {`${n.sender.firstname} ${n.sender.lastname}`}</p>
                <button
                  type="button"
                  onClick={() => deleteMessagesNotification(i, n.messages)}
                  className="close-one-notif-btn"
                ><i className="fas fa-times" />
                </button>
              </li>
            );
          }
          if (n.notification === 'new-friend') {
            return (
              <li
                className="notifications__li notifications__li--friend"
                key={n.notification + n.invitation.id + n.invitation.toMember.firstname}
              ><Link to={`/member/${n.invitation.toMember.id}`}>{`${n.invitation.toMember.firstname} ${n.invitation.toMember.lastname}`}</Link>  a accepté votre demande d'ajout.
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
  onAcceptInvitation: PropTypes.func.isRequired,
  onDenyInvitation: PropTypes.func.isRequired,
};

export default Notifications;
