import React, { useState } from 'react';

const Profile = ({
  match, params, users, user, isLogged,
}) => {
  // on récupère l'id de la query via l'objet props et ses propriétées match, params
  const queryId = parseInt(match.params.profileId, 10);
  // on cherche si l'id de la query existe dans la table user
  const foundMember = users.find((member) => member.id === queryId);
  const memberFullName = `${foundMember.firstname} ${foundMember.lastname}`;
  // const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="main">
      {foundMember ? (
        <h1>Mon profil (je suis connecté)</h1>
      ) : (
        <h1>Profil de {memberFullName}</h1>
      )}
    </div>
  );
};

export default Profile;
