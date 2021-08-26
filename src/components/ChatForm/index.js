import React from 'react';

import './style.scss';

const ChatForm = () => (
  <form className="form">
    <input 
      className="form_input"
      type="text"
      placeholder="Saisir votre message..."
    />
    <button
      className="form__button"
      type="submit"
    >
      Envoyer
    </button>
  </form>
);

export default ChatForm;
