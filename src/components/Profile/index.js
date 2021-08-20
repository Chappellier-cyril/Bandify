import React from 'react';
import './style.scss';

// TODO => PropTypes

const Profile = ({
  match, users, user, connectedUserId,
}) => {
// on récupère l'id de la query via l'objet props et ses propriétées match, params
  const queryId = parseInt(match.params.profileId, 10);
  // on cherche si l'id de la query existe dans la table user
  const foundMember = users.find((member) => member.id === queryId);

  const memberFullName = `${foundMember.firstname} ${foundMember.lastname}`;
  const userFullName = `${user.firstname} ${user.lastname}`;

  return (
    <div className="profile__page">
      {foundMember.id !== connectedUserId ? (
        <div className="profile">
          <div className="profile__card">
            <h1>{memberFullName}</h1>
            <h2>Ville: </h2>
            <p>{foundMember.age}</p>
            <p>{foundMember.user_description}</p>
            <button type="button">Retirer de ma liste d'amis</button>
          </div>
          <h2 className="profile__friends-title">Ses amis</h2>
          <div className="profile__friends">
            <p>Roger M</p>
            <p>Poissy</p>
          </div>
        </div>

      ) : (
        <div className="profile">
          <div className="profile__card">
            <h1>{userFullName}</h1>
            <h2>Ville: </h2>
            <p>{user.age}</p>
            <p>{user.user_description}</p>
            <button type="button">Supprimer mon profil</button>
          </div>
          <h2 className="profile__friends-title">Mes amis</h2>
          <div className="profile__friends">
            <p>Roger M</p>
            <p>Poissy</p>
          </div>
        </div>
      )}
    </div>
  );
};

Profile.defaultProps = {
  connectedUserId: 0,
};

export default Profile;
