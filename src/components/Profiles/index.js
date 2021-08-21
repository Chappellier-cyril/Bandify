import React, { useEffect } from 'react';
import MyProfile from './MyProfile';
import OtherProfile from './OtherProfile';
import './style.scss';

// TODO => PropTypes

// TODO => Corriger quand on va sur le profil
// TODO => de quelqu'un puis directement sur mon profil depuis le menu

const Profiles = ({
  users, user, connectedUserId, isLogged, getOneMember,
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
  }, []);

  return (
    (foundMember.id === connectedUserId)
      ? <MyProfile user={user} /> : <OtherProfile user={user} />
  );
};

Profiles.defaultProps = {
  connectedUserId: 0,
};

export default Profiles;
