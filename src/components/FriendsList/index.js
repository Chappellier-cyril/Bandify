import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const FriendsList = ({
  getCurrentUser, friends, onlineUsers, myId,
}) => {
  const onlineUsersWithoutMe = onlineUsers.filter((onlineUser) => Number(onlineUser.id) !== myId);

  return (
    <div className="friends">
      <ul className="friends-list">
        {friends.map((friend) => (
          <li className="friends-list__member" onClick={() => getCurrentUser(friend.id, friend.firstname)} key={friend.id}>
            <img className="friends-list__member--picture" src={`${process.env.BANDIFY_API_URL}/avatar/${friend.profil_image}`} alt="avatar du membre" />
            <p className="friends-list__member--name">{friend.firstname} {friend.lastname}</p>
            {onlineUsersWithoutMe[0]
          && onlineUsersWithoutMe
            .find((onlineUserWithoutMe) => Number(onlineUserWithoutMe.id) === friend.id)
          && <div className="friends-list__member--online-led" />}
          </li>
        ))}
        {friends.length === 0 && (
        <p>Vous n'avez pas encore d'amis</p>
        )}
      </ul>
    </div>
  );
};

FriendsList.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onlineUsers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  myId: PropTypes.number.isRequired,
};

export default FriendsList;
