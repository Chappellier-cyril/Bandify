import React from 'react';

import './style.scss';

const Header = ({ toggleIsMenuOpen }) => (
  <header className="header">

    <h1>Bandify</h1>

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
