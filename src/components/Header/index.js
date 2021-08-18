import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="nav">
        <h1>Bandify</h1>
        <nav className="header__nav">
          <ul className="header__nav-links">
            <Link to="/">
              <li className="header__nav-link">Accueil</li>
            </Link>

            <Link to="login">
              <li className="header__nav-link">Connexion</li>
            </Link>

            <Link to="/signup">
              <li className="header__nav-link">Inscription</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
