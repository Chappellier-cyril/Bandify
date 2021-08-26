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
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
