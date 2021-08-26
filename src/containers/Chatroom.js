import { connect } from 'react-redux';
import Chatroom from 'src/components/Chatroom';

const mapStateToProps = (state) => ({
  isChatroomOpen: state.settings.isChatroomOpen,
  isMessagesOpen: state.settings.isMessagesOpen,
  isFriendsListOpen: state.settings.isFriendsListOpen,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsChatroomOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_CHATROOM' });
  },
  toggleIsMessagesOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_MESSAGES' });
  },
  toggleIsFriendsListOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_FRIENDS_LIST' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
