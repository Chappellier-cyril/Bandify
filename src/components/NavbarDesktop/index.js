import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

const NavbarDesktop = ({
  user, onLogout,
}) => (

  <nav className="desktop__nav">
    <Link to="/" className="desktop__nav-link">
      Accueil
    </Link>
    {user.isLogged ? (
      <>
        <Link to={`/member/${user.id}`} className="desktop__nav-link">
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
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default NavbarDesktop;
