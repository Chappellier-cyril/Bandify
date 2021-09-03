import { connect } from 'react-redux';
import Sounds from 'src/components/Profiles/MyProfile/Sounds';

const mapStateToProps = (state) => ({
  editSound: state.users.editSound,
  sounds: state.users.user.sounds,
});

const mapDispatchToProps = (dispatch) => ({
  editFormToggle: (key) => {
    dispatch({
      type: 'EDIT_FORM_TOGGLE',
      key,
    });
  },
  handleSubmitSound: (e, sound) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_SOUND', sound });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sounds);
