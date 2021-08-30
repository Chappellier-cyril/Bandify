import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const FriendsList = ({ getCurrentUser, friends }) => {
  console.log('friends depuis FriendsList', friends);
  return (
    <div className="friends">
      <ul className="friends-list">
        {friends.map((friend) => (
          <li className="friends-list__member" onClick={() => getCurrentUser(friend.id, friend.firstname)} key={friend.id}>
            {friend.firstname} {friend.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

FriendsList.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default FriendsList;
