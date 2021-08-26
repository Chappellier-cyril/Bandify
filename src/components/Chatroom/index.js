import React from 'react';
import PropTypes from 'prop-types';
import Messages from 'src/components/Messages';
import ChatForm from 'src/components/ChatForm';
import FriendsList from 'src/components/FriendsList';
import './style.scss';

const Chatroom = ({
  isChatroomOpen,
  toggleIsChatroomOpen,
  toggleIsMessagesOpen,
  toggleIsFriendsListOpen,
  isMessagesOpen,
  isFriendsListOpen,
}) => (
  <div className={isChatroomOpen ? 'chatroom chatroom--open' : 'chatroom'}>
    <div className="chatroom__nav">
      <button
        type="button"
        className="chatroom__nav-link"
        onClick={toggleIsMessagesOpen}
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
    <button type="button" onClick={toggleIsChatroomOpen} className="close-menu-btn">
      <i className="fas fa-times" />
    </button>

    {isMessagesOpen && (
    <div className="chatroom__discussion">
      <Messages />
      <ChatForm />
    </div>
    )}

    {isFriendsListOpen && (
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
};

export default Chatroom;
