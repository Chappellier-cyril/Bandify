import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

function PageNotFound() {
  return (
    <div className="notFound__container">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <Link to="/" className="notFound__btn">Retour à la page d'accueil</Link>
  </div>
  );
  
}

export default PageNotFound;
