import { connect } from 'react-redux';
import Profiles from 'src/components/Profiles';

const mapStateToProps = (state) => ({
  users: state.users.users,
  user: state.users.user,
  connectedUserId: state.login.id,
  isLogged: state.login.isLogged,
  isDeleteModalClosed: state.settings.isDeleteModalClosed,
  editPhoto: state.users.editPhoto,
  editName: state.users.editName,
  editCity: state.users.editCity,
  editBirthdate: state.users.editBirthdate,
  editInstruments: state.users.editInstruments,
  editStyles: state.users.editStyles,
  editEmail: state.users.editEmail,
  editPassword: state.users.editPassword,
  editDescription: state.users.editDescription,
  firstName: state.users.user.firstName,
  lastName: state.users.user.lastName,
  dateOfBirth: state.users.user.dateOfBirth,
  emailInput: state.users.user.email,
  password: state.users.user.user_password,
  description: state.users.user.user_description,
  passwordShown: state.login.passwordShown,
  city: state.users.city,
  instrumentsData: state.settings.instruments,
  instruments: state.users.instruments,
  levelsData: state.settings.levels,
  pendingInvitations: state.users.pendingInvitations,
  acceptedInvitations: state.users.acceptedInvitations,
  friends: state.users.friends,
  isDeleteFriendModalOpen: state.settings.isDeleteFriendModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
  getOneMember: () => {
    dispatch({ type: 'GET_ONE_MEMBER' });
  },
  onWishToDeleteProfile: () => {
    dispatch({ type: 'DELETE_PROFILE_WISH' });
  },
  onDeleteProfile: () => {
    dispatch({ type: 'SAID_YES_TO_DELETE_PROFILE' });
  },
  editFormToggle: (key) => {
    dispatch({
      type: 'EDIT_FORM_TOGGLE',
      key,
    });
  },
  togglePasswordVisibility: () => {
    dispatch({ type: 'ON_PASSWORD_TOGGLE' });
  },
  onChangeProfileInput: (key, value) => {
    dispatch({
      type: 'CHANGE_INPUT_MODIFY_PROFILE',
      key,
      value,
    });
  },
  handleSubmitPhoto: (e, image) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_PHOTO', image });
  },
  handleSubmitName: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_NAME' });
  },
  handleSubmitEmail: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_EMAIL' });
  },
  handleSubmitBirthdate: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_BIRTHDATE' });
  },
  handleSubmitDescription: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_DESCRIPTION' });
  },
  handleSubmitPassword: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_PASSWORD' });
  },
  handleSubmitCity: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_CITY' });
  },
  handleSubmitStyles: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_STYLES' });
  },
  handleSubmitInstruments: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_INSTRUMENTS' });
  },
  onCityChange: (key, value) => {
    dispatch({
      type: 'CHANGE_CITY_INPUT',
      key,
      value,
    });
  },
  onSelectInput: (e, index, key) => {
    dispatch({
      type: 'CHANGE_INSTRUMENT_LEVEL_ON_PROFILE',
      key,
      index,
      value: e.target.value,
    });
  },
  addNewInstrument: () => {
    dispatch({
      type: 'ADD_NEW_INSTRUMENT_INPUT_PROFILE',
    });
  },
  removeInstrument: (index) => {
    dispatch({
      type: 'REMOVE_INSTRUMENT_INPUT_PROFILE',
      index,
    });
  },
  deleteInstrumentAssociation: () => {
    dispatch({
      type: 'WISH_TO_DELETE_INSTRUMENT_ASSOCIATION',
    });
  },
  sendInvitation: (id) => {
    dispatch({
      type: 'SEND_INVITATION_TO_USER', id,
    });
  },
  wishToDeleteFriend: () => {
    dispatch({ type: 'DELETE_FRIEND_WISH' });
  },
  deleteFromFriendList: (accepted, pending,
    friends, acceptedUser, pendingUser, friendUser) => {
    dispatch({
      type: 'DELETE_FROM_FRIENDLIST', accepted, pending, friends, acceptedUser, pendingUser, friendUser,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
