import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Chatroom = ({ isChatroomOpen, toggleIsChatroomOpen }) => (
  <div className={isChatroomOpen ? 'chatroom chatroom--open' : 'chatroom'}>
    Comopsannt chatroom
    <button type="button" onClick={toggleIsChatroomOpen} className="close-menu-btn">
      <i className="fas fa-times" />
    </button>
  </div>
);

Chatroom.propTypes = {
  isChatroomOpen: PropTypes.bool.isRequired,
  toggleIsChatroomOpen: PropTypes.func.isRequired,
};

export default Chatroom;
