import { connect } from 'react-redux';
import Header from 'src/components/Header';

// const mapStateToProps = (state) => ({

// });

const mapDispatchToProps = (dispatch) => ({
  toggleIsMenuOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_MENU' });
  },
  toggleIsChatroomOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_CHATROOM' });
  },
});

export default connect(null, mapDispatchToProps)(Header);
