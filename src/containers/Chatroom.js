import { connect } from 'react-redux';
import Chatroom from 'src/components/Chatroom';

const mapStateToProps = (state) => ({
  isChatroomOpen: state.settings.isChatroomOpen,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsChatroomOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_CHATROOM' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
