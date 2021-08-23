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
  isProfileDeleted,
  deleteProfileMessage,
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
          isProfileDeleted={isProfileDeleted}
          deleteProfileMessage={deleteProfileMessage}
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
  isProfileDeleted: PropTypes.bool.isRequired,
  deleteProfileMessage: PropTypes.string.isRequired,
};

Profiles.defaultProps = {
  connectedUserId: 0,
  onWishToDeleteProfile: null,
  onDeleteProfile: null,
};

export default Profiles;
