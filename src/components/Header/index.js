import React from 'react';
import { Link } from 'react-router-dom';

import logoBandify from 'src/assets/logoBandify.svg';
import './style.scss';

const Header = ({ toggleIsMenuOpen }) => (
  <header className="header">

    <Link to="/">
      <img src={logoBandify} alt="bandify" className="bandify__logo" />
    </Link>

    <button
      type="button"
      className="header__menu-btn"
      onClick={toggleIsMenuOpen}
    >
      <i className="fas fa-bars" />
    </button>

  </header>
);

export default Header;
