import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

const Navbar = ({
  user, onLogout, hideMenu, isMenuOpen,
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
      <Link to="/" className="menu__nav-link" onClick={hideMenu}>
        Accueil
      </Link>
      {user.isLogged ? (
        <>
          <Link to={`/member/${user.id}`} className="menu__nav-link" onClick={hideMenu}>
            Mon profil
          </Link>
          <Link to="/" onClick={onLogout} className="menu__nav-link">
            Deconnexion
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="menu__nav-link" onClick={hideMenu}>
            Connexion
          </Link>
          <Link to="/signup" className="menu__nav-link" onClick={hideMenu}>
            Inscription
          </Link>
        </>
      )}
    </nav>
  </div>

);

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default Navbar;
