import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const FriendsList = ({ getCurrentUser, friends }) => (
  <div className="friends">
    <ul className="friends-list">
      {friends.map((friend) => (
        <li className="friends-list__member" onClick={() => getCurrentUser(friend.id, friend.firstname)} key={friend.id}>
          {friend.firstname} {friend.lastname}
        </li>
      ))}
      {friends.length === 0 && (
        <p>Vous n'avez pas encore d'amis</p>
      )}
    </ul>
  </div>
);

FriendsList.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default FriendsList;
