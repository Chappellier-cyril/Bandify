import { connect } from 'react-redux';
import ProfileMenu from 'src/components/Profiles/MyProfile/ProfileMenu';

const mapStateToProps = (state) => ({
  editPassword: state.users.editPassword,
  passwordShown: state.login.passwordShown,
  password: state.users.user.user_password,
  userId: state.login.id,
  isProfileMenuOpen: state.settings.isProfileMenuOpen,
  isEditing: state.users.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  toggleProfileMenuOpen: () => {
    dispatch({ type: 'TOGGLE_PROFILE_MENU' });
  },
  onWishToDeleteProfile: () => {
    dispatch({ type: 'DELETE_PROFILE_WISH' });
  },
  toggleIsEditing: () => {
    dispatch({ type: 'TOGGLE_IS_EDITING' });
  },
  handleSubmitPassword: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_PASSWORD' });
  },
  editFormToggle: (key) => {
    dispatch({
      type: 'EDIT_FORM_TOGGLE',
      key,
    });
  },
  onChangeProfileInput: (key, value) => {
    dispatch({
      type: 'CHANGE_INPUT_MODIFY_PROFILE',
      key,
      value,
    });
  },
  togglePasswordVisibility: () => {
    dispatch({ type: 'ON_PASSWORD_TOGGLE' });
  },
  handleSubmitSound: (e, sound) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_SOUND', sound });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
