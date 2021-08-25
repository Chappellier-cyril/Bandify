import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__nav">
        <Link to="/about">
          <li className="footer__nav--button">A propos</li>
        </Link>

        <Link to="/contact">
          <li className="footer__nav--button">Contact</li>
        </Link>
      </ul>
    </footer>
  );
}
