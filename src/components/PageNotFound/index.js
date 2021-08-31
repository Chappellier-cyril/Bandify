import React from 'react';
import { Link } from 'react-router-dom';

import pageNotFoundLogo from 'src/assets/PageNotFound.png';
import './style.scss';

function PageNotFound() {
  return (
    <div className="notFound__container">
    <img src={pageNotFoundLogo} alt="404" className="notFound__container--logo" />
    <Link to="/" className="notFound__btn">Retour à la page d'accueil</Link>
  </div>
  );
  
}

export default PageNotFound;
