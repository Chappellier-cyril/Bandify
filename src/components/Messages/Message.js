/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  content, reicever_id, sender_id, reicever, sender,
}) => (
  <div className="message">
    <div className={(reicever_id === reicever
      && sender_id === sender)
      ? 'message__content message__content--mine'
      : 'message__content message__content--his'}
    >
      {content}
    </div>
  </div>
);

Message.propTypes = {
  content: PropTypes.string.isRequired,
  reicever_id: PropTypes.number.isRequired,
  sender_id: PropTypes.number.isRequired,
  reicever: PropTypes.number,
  sender: PropTypes.number.isRequired,
};

Message.defaultProps = {
  reicever: null,
};

export default Message;
