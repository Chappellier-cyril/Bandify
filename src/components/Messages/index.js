import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import './style.scss';

const Messages = ({
  messages, getMessages, receiverName,
}) => {
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="messages">
      <p className="messages__author">{receiverName}</p>
      {console.log(messages)}
      {messages.map((message) => (
        <Message
          key={message.id}
          {...message}
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
  getIds: PropTypes.func.isRequired,
};

export default Messages;
