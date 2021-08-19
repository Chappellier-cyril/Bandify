import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

const Header = ({ user, onLogout }) => (
  <header className="header">
    <div className="nav">
      <h1>Bandify</h1>
      <nav className="header__nav">
        <ul className="header__nav-links">
          <Link to="/">
            <li className="header__nav-link">Accueil</li>
          </Link>

          {user.isLogged ? (
            <>
              <Link to={`/member/${user.id}`}>
                <li className="header__nav-link">Mon profil</li>
              </Link>
              <Link to="/" onClick={onLogout}>
                <li className="header__nav-link">Deconnexion</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className="header__nav-link">Connexion</li>
              </Link>
              <Link to="/signup">
                <li className="header__nav-link">Inscription</li>
              </Link>
            </>
          )}

        </ul>
      </nav>
    </div>
  </header>
);

Header.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
