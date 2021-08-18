import React from 'react';
import usersData from 'src/data/users';

const Profile = (props) => {
  const queryId = parseInt(props.match.params.profileId, 10);
  const foundMember = usersData.find((user) => user.id === queryId);
  const memberFullName = `${foundMember.firstname} ${foundMember.lastname}`;

  return (
    <h1>Profil de {memberFullName}</h1>
  );
};

export default Profile;
