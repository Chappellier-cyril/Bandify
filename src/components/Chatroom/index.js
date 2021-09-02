import React from 'react';
import PropTypes from 'prop-types';

import ChatForm from 'src/containers/ChatForm';
import Messages from 'src/containers/Messages';
import FriendsList from 'src/containers/FriendsList';

import './style.scss';

const Chatroom = ({
  isChatroomOpen,
  toggleIsChatroomOpen,
  toggleIsMessagesOpen,
  toggleIsFriendsListOpen,
  isMessagesOpen,
  isFriendsListOpen,
  friends,
}) => (
  <div className={isChatroomOpen ? 'chatroom chatroom--open' : 'chatroom'}>
    <div className="chatroom__close-menu">
      <button type="button" onClick={toggleIsChatroomOpen} className="close-menu-btn">
        <i className="fas fa-times" />
      </button>
    </div>
    <div className="chatroom__nav">
      <button
        type="button"
        className="chatroom__nav-link"
        onClick={toggleIsMessagesOpen}
        disabled={friends.length === 0}
      >
        Conversation
      </button>
      <button
        type="button"
        className="chatroom__nav-link"
        onClick={toggleIsFriendsListOpen}
      >
        Amis
      </button>
    </div>

    {isMessagesOpen && (
    <div className="chatroom__discussion">
      <Messages />
      <ChatForm />
    </div>
    )}

    {isFriendsListOpen && friends && (
      <FriendsList />
    )}
  </div>
);

Chatroom.propTypes = {
  isChatroomOpen: PropTypes.bool.isRequired,
  toggleIsChatroomOpen: PropTypes.func.isRequired,
  toggleIsMessagesOpen: PropTypes.func.isRequired,
  toggleIsFriendsListOpen: PropTypes.func.isRequired,
  isMessagesOpen: PropTypes.bool.isRequired,
  isFriendsListOpen: PropTypes.bool.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Chatroom;
