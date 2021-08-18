import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default function Header() {
  return (
    <div className="nav">
    <h1>Bandify</h1>
    <ul>
      <Link to="/">
        <li>Accueil</li>
      </Link>

      <Link to="login">
        <li>Connexion</li>
      </Link>

      <Link to ="/signup">
        <li>Inscription</li>
      </Link>
    </ul>
    </div>
  );
}

