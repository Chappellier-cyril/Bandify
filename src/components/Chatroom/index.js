import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Chatroom = ({ isChatroomOpen, toggleIsChatroomOpen }) => (
  <div className={isChatroomOpen ? 'chatroom chatroom--open' : 'chatroom'}>
    <div className="chatroom__nav">
      <button type="button" className="chatroom__nav-link">Conversation</button>
      <button type="button" className="chatroom__nav-link">Amis</button>
    </div>

    <button type="button" onClick={toggleIsChatroomOpen} className="close-menu-btn">
      <i className="fas fa-times" />
    </button>

    <div className="chatroom__messages">
      <p className="chatroom__messages-item">Salut</p>
      <p className="chatroom__messages-item">Ca va ?</p>
      <p className="chatroom__messages-item">Non</p>
      <p className="chatroom__messages-item">Ma connexion est a chier.</p>
    </div>

    <div className="chatroom__friends">
      <ul className="chatroom__friends-list">
        <li className="chatroom__friends-list__member">Roger</li>
        <li className="chatroom__friends-list__member">Bardolph</li>
        <li className="chatroom__friends-list__member">Tim</li>
        <li className="chatroom__friends-list__member">Jason</li>
      </ul>
    </div>

  </div>
);

Chatroom.propTypes = {
  isChatroomOpen: PropTypes.bool.isRequired,
  toggleIsChatroomOpen: PropTypes.func.isRequired,
};

export default Chatroom;
