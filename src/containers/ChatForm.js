import { connect } from 'react-redux';
import ChatForm from 'src/components/ChatForm';

const mapStateToProps = (state) => ({
  messageInputValue: state.settings.messageInputValue,
});

const mapDispatchToProps = (dispatch) => ({
  onMessageInputChange: (value) => {
    dispatch({ type: 'SET_MESSAGE_INPUT_VALUE', messageInputValue: value });
  },
  onChatFormSubmit: (evt) => {
    evt.preventDefault();
    dispatch({ type: 'ON_MESSAGE_SUBMIT' });
  },
  sendTyping: () => {
    dispatch({ type: 'SEND_I_WRITE' });
  },
  sendNoTyping: () => {
    dispatch({ type: 'SEND_NO_WRITE' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
