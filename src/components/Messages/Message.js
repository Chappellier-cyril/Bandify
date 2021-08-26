import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ content }) => (
  <li className="message">
    <p className="message__content message__content--his">{content}</p>
    <p className="message__content message__content--mine">{content}</p>
  </li>
);

Message.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Message;
