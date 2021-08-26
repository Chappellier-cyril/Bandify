import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ author, content }) => (
  <div className="message">
    <div className="message__content message__content--his">{content}</div>
    {/* <div className="message__content message__content--mine">{content}</div> */}
  </div>
);

Message.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Message;
