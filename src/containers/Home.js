import { connect } from 'react-redux';
import Home from 'src/components/Home';

const mapStateToProps = (state) => ({
  users: state.users.users,
  user: state.users.user,
  searchValue: state.users.searchValue,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (value) => {
    dispatch({ type: 'SET_SEARCH_INPUT_VALUE', searchValue: value });
  },
  onSearchSubmit: (evt) => {
    evt.preventDefault();
    dispatch({ type: 'ON_SEARCH_SUBMIT' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
