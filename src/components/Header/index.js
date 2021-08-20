import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Header = ({ toggleIsMenuOpen }) => (
  <header className="header">

    <Link to="/">Bandify</Link>

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
