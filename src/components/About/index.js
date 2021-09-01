import React from 'react';
import { Link } from 'react-router-dom';

import imageAmaury from 'src/assets/amaury.jpeg';
import imageJeremy from 'src/assets/jeremy.jpeg';
import imageCyril from 'src/assets/cyril.jpg';
import imageArnaud from 'src/assets/arnaud.jpeg';
import imageBaptiste from 'src/assets/baptiste.jpeg';


import './style.scss';

const About = () => (
  // TODO Styles scss
  <div className="about">
    <h1 className="about--title">A Propos</h1>
    <div className="about__container">
      L'idée du projet Bandify est parti d'un constat simple :
      Une difficulté dans le milieu de la musique à faire se reconcentrer des musiciens partageant
      la même passion. <br/>
      Peu importe où vous habitez en France, Bandify se charge de vous proposer
      des profils adaptés en fonction de votre recherche.
      Bandify a pour ambition de faciliter l'échange et le partage autour
      de la musique, et vous propose un service de messagerie instantanée.
    </div>
    <div className="about__us">
      <h2 className="about__us--title">L'équipe derrière le projet...</h2>
      <div className="about__us__img">
        <img className="about__us__img--one" src={imageAmaury} alt="Photo de Cyril"/>
        <img className="about__us__img--one" src={imageArnaud} alt="Photo de Arnaud"/>
        <img className="about__us__img--one" src={imageJeremy} alt="Photo de Jeremy"/>
        <img className="about__us__img--one" src={imageCyril} alt="Photo de Amaury"/>
        <img className="about__us__img--one" src={imageBaptiste} alt="Photo de Baptiste"/>
      </div>
      </div>
    <div className="about__desc">
      Bandify a été crée par une équipe de 5 développeurs,
      tous issus de l'école O'Clock et réunis autour des mêmes passions.
    </div>

    

    <Link to="/contact" className="about__container--btn">Contactez-nous</Link>

  </div>
);

export default About;
