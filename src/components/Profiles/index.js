import React, { useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';
import MyProfile from './MyProfile';
import OtherProfile from './OtherProfile';
import './style.scss';

const Profiles = ({
  users,
  user,
  connectedUserId,
  isLogged,
  getOneMember,
  onWishToDeleteProfile,
  onDeleteProfile,
  isDeleteModalClosed,
  editFormToggle,
  editPhoto,
  editName,
  editCity,
  editBirthdate,
  editInstruments,
  editStyles,
  editEmail,
  editPassword,
  editDescription,
  firstName,
  lastName,
  dateOfBirth,
  emailInput,
  password,
  description,
  passwordShown,
  togglePasswordVisibility,
  onChangeProfileInput,
  handleSubmitPhoto,
  handleSubmitName,
  handleSubmitEmail,
  handleSubmitBirthdate,
  handleSubmitDescription,
  handleSubmitPassword,
  handleSubmitCity,
  handleSubmitStyles,
  handleSubmitInstruments,
  city,
  onCityChange,
  instruments,
  instrumentsData,
  levelsData,
  onSelectInput,
  addNewInstrument,
  removeInstrument,
  deleteInstrumentAssociation,
  sendInvitation,
  isInvitationSent,
  invitations,
  friends,
}) => {
  const url = window.location.href;
  // pour avoir le dernier segment de l'url
  const lastSegmentUrl = url.split('/').pop();
  // on récupère l'id de la query via l'objet props et ses propriétées match, params
  const queryId = parseInt(lastSegmentUrl, 10);
  // on cherche si l'id de la query existe dans la table user
  const foundMember = users.find((member) => member.id === queryId);

  useEffect(() => {
    if (isLogged) {
      // on est connecté, on récupère les membres de la bdd via la requête à l'api
      // qui passe dans le userMiddleware
      getOneMember();
    }
  }, [lastSegmentUrl]);

  return (
    (foundMember && (foundMember.id === connectedUserId))
      ? (
        <MyProfile
          user={user}
          onWishToDeleteProfile={onWishToDeleteProfile}
          isDeleteModalClosed={isDeleteModalClosed}
          onDeleteProfile={onDeleteProfile}
          editFormToggle={editFormToggle}
          editPhoto={editPhoto}
          editName={editName}
          editCity={editCity}
          editBirthdate={editBirthdate}
          editInstruments={editInstruments}
          editStyles={editStyles}
          editEmail={editEmail}
          editPassword={editPassword}
          editDescription={editDescription}
          firstName={firstName}
          lastName={lastName}
          dateOfBirth={dateOfBirth}
          emailInput={emailInput}
          password={password}
          description={description}
          passwordShown={passwordShown}
          togglePasswordVisibility={togglePasswordVisibility}
          onChangeProfileInput={onChangeProfileInput}
          handleSubmitPhoto={handleSubmitPhoto}
          handleSubmitName={handleSubmitName}
          handleSubmitEmail={handleSubmitEmail}
          handleSubmitBirthdate={handleSubmitBirthdate}
          handleSubmitDescription={handleSubmitDescription}
          handleSubmitPassword={handleSubmitPassword}
          handleSubmitCity={handleSubmitCity}
          handleSubmitStyles={handleSubmitStyles}
          handleSubmitInstruments={handleSubmitInstruments}
          city={city}
          onCityChange={onCityChange}
          instruments={instruments}
          instrumentsData={instrumentsData}
          levelsData={levelsData}
          onSelectInput={onSelectInput}
          addNewInstrument={addNewInstrument}
          removeInstrument={removeInstrument}
          deleteInstrumentAssociation={deleteInstrumentAssociation}
          friends={friends}
        />
      ) : (
        <OtherProfile
          user={user}
          sendInvitation={sendInvitation}
          isInvitationSent={isInvitationSent}
          invitations={invitations}
        />
      )
  );
};

Profiles.propTypes = {
  users: PropTypes.arrayOf(shape({})).isRequired,
  user: PropTypes.object.isRequired,
  connectedUserId: PropTypes.number,
  isLogged: PropTypes.bool.isRequired,
  getOneMember: PropTypes.func.isRequired,
  onWishToDeleteProfile: PropTypes.func,
  onDeleteProfile: PropTypes.func,
  isDeleteModalClosed: PropTypes.bool.isRequired,
  editFormToggle: PropTypes.func,
  editPhoto: PropTypes.bool.isRequired,
  editName: PropTypes.bool.isRequired,
  editCity: PropTypes.bool.isRequired,
  editBirthdate: PropTypes.bool.isRequired,
  editInstruments: PropTypes.bool.isRequired,
  editStyles: PropTypes.bool.isRequired,
  editEmail: PropTypes.bool.isRequired,
  editPassword: PropTypes.bool.isRequired,
  editDescription: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dateOfBirth: PropTypes.string,
  emailInput: PropTypes.string.isRequired,
  password: PropTypes.string,
  description: PropTypes.string.isRequired,
  passwordShown: PropTypes.bool.isRequired,
  togglePasswordVisibility: PropTypes.func,
  onChangeProfileInput: PropTypes.func,
  handleSubmitPhoto: PropTypes.func.isRequired,
  handleSubmitName: PropTypes.func.isRequired,
  handleSubmitEmail: PropTypes.func.isRequired,
  handleSubmitBirthdate: PropTypes.func.isRequired,
  handleSubmitDescription: PropTypes.func.isRequired,
  handleSubmitPassword: PropTypes.func.isRequired,
  handleSubmitCity: PropTypes.func.isRequired,
  handleSubmitStyles: PropTypes.func.isRequired,
  handleSubmitInstruments: PropTypes.func.isRequired,
  city: PropTypes.string,
  onCityChange: PropTypes.func,
  instrumentsData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  levelsData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  instruments: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  onSelectInput: PropTypes.func,
  addNewInstrument: PropTypes.func,
  removeInstrument: PropTypes.func,
  deleteInstrumentAssociation: PropTypes.func,
  sendInvitation: PropTypes.func,
  isInvitationSent: PropTypes.bool.isRequired,
  invitations: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Profiles.defaultProps = {
  connectedUserId: 0,
  onWishToDeleteProfile: null,
  onDeleteProfile: null,
  editFormToggle: null,
  togglePasswordVisibility: null,
  onChangeProfileInput: null,
  // handleSubmitPhoto: null,
  // handleSubmitName: null,
  // handleSubmitEmail: null,
  // handleSubmitBirthdate: null,
  // handleSubmitDescription: null,
  // handleSubmitPassword: null,
  // handleSubmitCity: null,
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  password: '',
  city: '',
  onCityChange: null,
  onSelectInput: null,
  addNewInstrument: null,
  removeInstrument: null,
  deleteInstrumentAssociation: null,
  sendInvitation: null,
};

export default Profiles;
