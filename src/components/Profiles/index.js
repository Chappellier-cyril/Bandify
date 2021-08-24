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
  email,
  password,
  description,
  passwordShown,
  togglePasswordVisibility,
  onChangeInput,
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
    (foundMember.id === connectedUserId)
      ? (
        <MyProfile
          user={user}
          onWishToDeleteProfile={onWishToDeleteProfile}
          isDeleteModalClosed={isDeleteModalClosed}
          onDeleteProfile={onDeleteProfile}
          isLogged={isLogged}
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
          email={email}
          password={password}
          description={description}
          passwordShown={passwordShown}
          togglePasswordVisibility={togglePasswordVisibility}
          onChangeInput={onChangeInput}
        />
      ) : <OtherProfile user={user} />
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
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  dateOfBirth: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  passwordShown: PropTypes.bool.isRequired,
  togglePasswordVisibility: PropTypes.func,
  onChangeInput: PropTypes.func,
};

Profiles.defaultProps = {
  connectedUserId: 0,
  onWishToDeleteProfile: null,
  onDeleteProfile: null,
  editFormToggle: null,
  togglePasswordVisibility: null,
  onChangeInput: null,
};

export default Profiles;
