import React from 'react';
import './style.scss';

const FriendsList = ({ users, getCurrentUser }) => (

  <div className="friends">
    <ul className="friends-list">
      {users.map((user) => (
        <li className="friends-list__member" onClick={() => getCurrentUser(user.id, user.firstname)} key={user.id}>
          {user.firstname} {user.lastname}
        </li>
      ))}
    </ul>
  </div>

);

export default FriendsList;
