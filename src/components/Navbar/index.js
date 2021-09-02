import React from 'react';
import { NavLink } from 'react-router-dom';
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
      <NavLink exact to="/" className="menu__nav--link" onClick={hideMenu} activeClassName="menu__nav--link--is-active">
        Accueil
      </NavLink>
      {isLogged ? (
        <>
          <NavLink to={`/member/${connectedUserId}`} className="menu__nav--link" onClick={hideMenu} activeClassName="menu__nav--link--is-active">
            Mon profil
          </NavLink>
          <NavLink from="/logout" to="/" onClick={onLogout} className="menu__nav--link menu__nav--link--signup">
            Deconnexion
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login" className="menu__nav--link" onClick={hideMenu} activeClassName="menu__nav--link--is-active">
            Connexion
          </NavLink>
          <NavLink exact to="/signup" className="menu__nav--link menu__nav--link--signup" onClick={hideMenu} activeClassName="menu__nav--link--is-active">
            Inscription
          </NavLink>
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
