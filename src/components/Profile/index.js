import React from 'react';
import './style.scss';

const Profile = ({
  match, users, user,
}) => {
// on récupère l'id de la query via l'objet props et ses propriétées match, params
  const queryId = parseInt(match.params.profileId, 10);
  // on cherche si l'id de la query existe dans la table user
  const foundMember = users.find((member) => member.id === queryId);

  const memberFullName = `${foundMember.firstname} ${foundMember.lastname}`;
  const userFullName = `${user.firstname} ${user.lastname}`;

  return (
    <div className="profile__page">
      {foundMember.id !== user.id ? (
        <div className="profile__container">
          <div className="profile__page-card">
            <h1>{memberFullName}</h1>
            <h2>Ville: </h2>
            <p>{foundMember.age}</p>
            <p>{foundMember.user_description}</p>
            <button type="button">Retirer de ma liste d'amis</button>
          </div>
          <div className="profile__friends" />
        </div>

      ) : (
        <div className="profile__container">
          <div className="profile__card">
            <h1>{userFullName}</h1>
            <h2>Ville: </h2>
            <p>{user.age}</p>
            <p>{user.user_description}</p>
            <button type="button">Supprimer mon profil</button>
          </div>
          <div className="profile__friends" />
        </div>
      )}
    </div>
  );
};
export default Profile;
