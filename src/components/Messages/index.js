import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import './style.scss';

const Messages = ({
  messages, receiverName, reicever, sender,
}) => {
  // create messageRef
  const messageRef = useRef();
  // useEffect(() => {
  //   getMessages();
  // }, []);
  // UseEffect à chaque chagement du state de messages
  useEffect(() => {
    /* scroll de toute la hauteur de scroll disponible /
    Quand le tableau de message change on appel cet effet */
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
    // On y pose la ref ici
      ref={messageRef}
      className="messages"
    >
      <p className="messages__author">{receiverName}</p>
      {messages.map((message) => (
        <Message
          key={message.id}
          {...message}
          reicever={reicever}
          sender={sender}
        />
      ))}
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
  })).isRequired,
  getMessages: PropTypes.func.isRequired,
  receiverName: PropTypes.string.isRequired,
  reicever: PropTypes.number.isRequired,
  sender: PropTypes.number.isRequired,
};

export default Messages;
