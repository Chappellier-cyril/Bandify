import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavbarDesktop from 'src/containers/NavbarDesktop';
import logoBandify from 'src/assets/logoBandify.svg';
import './style.scss';

const Header = ({ toggleIsMenuOpen }) => (
  <header className="header">
    <div className="header__bandify">
      <Link to="/">
        <img src={logoBandify} alt="bandify" className="header__bandify--logo" />
      </Link>
      <h1 className="header__bandify--title">Bandify</h1>
    </div>

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
