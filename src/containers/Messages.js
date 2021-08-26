import { connect } from 'react-redux';
import Messages from 'src/components/Messages';

const mapStateToProps = (state) => ({
  messages: state.settings.messages,
  receiverName: state.settings.reicever_name,
});

const mapDispatchToProps = (dispatch) => ({
  getMessages: () => {
    dispatch({ type: 'GET_MESSAGES' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
