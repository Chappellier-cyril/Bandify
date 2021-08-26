import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

const Navbar = ({
  connectedUserId, onLogout, hideMenu, isMenuOpen, isLogged,
}) => (
  <div className={isMenuOpen ? 'menu menu--open' : 'menu'}>

    <button
      type="button"
      className="close-menu-btn"
      onClick={hideMenu}
    >
      <i className="fas fa-times" />
    </button>

    <nav className="menu__nav">
      <Link to="/" className="menu__nav--link" onClick={hideMenu}>
        Accueil
      </Link>
      {isLogged ? (
        <>
          <Link to={`/member/${connectedUserId}`} className="menu__nav--link" onClick={hideMenu}>
            Mon profil
          </Link>
          <Link to="/" onClick={onLogout} className="menu__nav--link menu__nav--link--signup">
            Deconnexion
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="menu__nav--link" onClick={hideMenu}>
            Connexion
          </Link>
          <Link to="/signup" className="menu__nav--link menu__nav--link--signup" onClick={hideMenu}>
            Inscription
          </Link>
        </>
      )}
    </nav>
  </div>
);

Navbar.propTypes = {
  connectedUserId: PropTypes.number,
  isLogged: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

Navbar.defaultProps = {
  connectedUserId: 0,
};

export default Navbar;
