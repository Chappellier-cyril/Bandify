import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

const NavbarDesktop = ({
  connectedUserId, onLogout, isLogged,
}) => (

  <nav className="desktop__nav">
    <Link to="/" className="desktop__nav-link">
      Accueil
    </Link>
    {isLogged ? (
      <>
        <Link to={`/member/${connectedUserId}`} className="desktop__nav-link">
          Mon profil
        </Link>
        <Link to="/" onClick={onLogout} className="desktop__nav-link">
          Deconnexion
        </Link>
      </>
    ) : (
      <>
        <Link to="/login" className="desktop__nav-link">
          Connexion
        </Link>
        <Link to="/signup" className="desktop__nav-link">
          Inscription
        </Link>
      </>
    )}
  </nav>
);

NavbarDesktop.propTypes = {
  connectedUserId: PropTypes.number,
  isLogged: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

NavbarDesktop.defaultProps = {
  connectedUserId: 0,
};

export default NavbarDesktop;
