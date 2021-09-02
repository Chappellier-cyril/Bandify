import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

const NavbarDesktop = ({
  connectedUserId, onLogout, isLogged,
}) => (

  <nav className="desktop__nav">
    <NavLink exact to="/" className="desktop__nav-link" activeClassName="desktop__nav-link--is-active">
      Accueil
    </NavLink>
    {isLogged ? (
      <>
        <NavLink to={`/member/${connectedUserId}`} className="desktop__nav-link" activeClassName="desktop__nav-link--is-active">
          Mon profil
        </NavLink>
        <NavLink exact to="/logout" onClick={onLogout} className="desktop__nav-link" activeClassName="desktop__nav-link--is-active">
          Deconnexion
        </NavLink>
      </>
    ) : (
      <>
        <NavLink to="/login" className="desktop__nav-link" activeClassName="desktop__nav-link--is-active">
          Connexion
        </NavLink>
        <NavLink to="/signup" className="desktop__nav-link" activeClassName="desktop__nav-link--is-active">
          Inscription
        </NavLink>
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
