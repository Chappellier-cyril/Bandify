import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Home({ users }) {
  return (
    <div className="main">
      <h2>
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      </h2>
      <a href="#">Rejoindre la communauté</a>
      {
     users.map((user) => (
       <li className="users">{user.firstname}</li>
     ))
     }
    </div>
  );
}
