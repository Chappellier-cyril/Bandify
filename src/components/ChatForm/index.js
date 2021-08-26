import React from 'react';

import './style.scss';

const ChatForm = () => (
  <form className="chatroom__form">
    <input
      className="chatroom__form-input"
      type="text"
      placeholder="Saisir votre message..."
    />
    <button
      className="chatroom__form-button"
      type="submit"
    >
      <i className="fas fa-paper-plane" />
    </button>
  </form>
);

export default ChatForm;
