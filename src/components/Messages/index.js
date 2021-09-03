import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import './style.scss';

const Messages = ({
  messages, receiverName, reicever, sender, isTyping,
}) => {
  const [filteredMessages, setFilteredMessages] = useState([]);
  // create messageRef
  const messageRef = useRef();
  useEffect(() => {
    const filtmess = messages.filter((message) => (message.sender_id === sender
      && message.reicever_id === reicever)
      || (message.sender_id === reicever && message.reicever_id === sender));
    setFilteredMessages(filtmess);
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [messages]);
  // UseEffect à chaque chagement du state de messages

  return (
    <div
    // On y pose la ref ici
      ref={messageRef}
      className="messages"
    >
      <p className="messages__author">{receiverName}</p>
      {filteredMessages.map((message) => (
        <Message
          key={message.id}
          {...message}
          reicever={reicever}
          sender={sender}
        />
      ))}
      <span className={`isTyping ${isTyping[1] && (isTyping[0] === reicever)
        ? 'isTyping--visible' : 'isTyping--hiden'}`}
      >{receiverName} écrit
        <div className={`isTyping__anim ${isTyping[1] && (isTyping[0] === reicever)
          ? 'isTyping__anim--first' : 'isTyping__anim--hiden'}`}
        />
        <div className={`isTyping__anim ${isTyping[1] && (isTyping[0] === reicever)
          ? 'isTyping__anim--second' : 'isTyping__anim--hiden'}`}
        />
        <div className={`isTyping__anim ${isTyping[1] && (isTyping[0] === reicever)
          ? 'isTyping__anim--third' : 'isTyping__anim--hiden'}`}
        />
      </span>
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
  reicever: PropTypes.number,
  sender: PropTypes.number.isRequired,
  isTyping: PropTypes.array,
};

Messages.defaultProps = {
  reicever: null,
  isTyping: [false, 0],
};

export default Messages;
