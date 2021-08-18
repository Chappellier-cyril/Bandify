import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <ul>
        <Link to="/about">
          <li>A propos</li>
        </Link>

        <Link to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </footer>
  );
}
