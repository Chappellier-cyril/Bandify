import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavbarDesktop from 'src/containers/NavbarDesktop';
import logoBandify from 'src/assets/logoBandify.svg';
import './style.scss';

const Header = ({ toggleIsMenuOpen }) => (
  <header className="header">

    <Link to="/">
      <img src={logoBandify} alt="bandify" className="bandify__logo" />
    </Link>

    <NavbarDesktop />

    <button
      type="button"
      className="header__menu-btn"
      onClick={toggleIsMenuOpen}
    >
      <i className="fas fa-bars" />
    </button>

  </header>
);

Header.propTypes = {
  toggleIsMenuOpen: PropTypes.func.isRequired,
};

export default Header;
