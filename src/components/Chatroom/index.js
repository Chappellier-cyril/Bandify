import React from 'react';
import PropTypes from 'prop-types';
import Messages from 'src/components/Messages';
import ChatForm from 'src/components/ChatForm';
import './style.scss';
import messagesData from 'src/data/messages';

const Chatroom = ({ isChatroomOpen, toggleIsChatroomOpen }) => (
  <div className={isChatroomOpen ? 'chatroom chatroom--open' : 'chatroom'}>
     Chatroom
    <button type="button" onClick={toggleIsChatroomOpen} className="close-menu-btn">
      <i className="fas fa-times" />
    </button>
    <Messages messages={messagesData} />
    <ChatForm />
  </div>
);

Chatroom.propTypes = {
  isChatroomOpen: PropTypes.bool.isRequired,
  toggleIsChatroomOpen: PropTypes.func.isRequired,
};

export default Chatroom;
