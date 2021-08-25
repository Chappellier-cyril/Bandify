import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const About = () => (
  // TODO Styles scss
  <div className="about">
    <h1>A Propos</h1>
    <p className="about__desc">
      L'idée du projet Bandify est parti d'un constat simple :
      Une difficulté dans le milieu de la musique à faire se reconcentrer des musiciens partageant
      la même passion, afin de partager son travail, collaborer.
      Peu importe où vous habitez en France, Bandify se chargera de vous proposer des profils adaptés en fonction de votre recherche, et de vos besoins.
      Bandify a pour ambitions de faciliter l'échange et le partage autour de la musique, et vous proposons un service de messagerie instantanée.
    </p>

    <p className="about__us">
      Bandify a été crée par une équipe de 5 développeurs, tous issus de l'école O'Clock et réunis autour des mêmes passions.
    </p>

    <Link to="/contact" className="home__signup-btn">Contactez-nous</Link>
  
    
  </div>
);

export default About;
