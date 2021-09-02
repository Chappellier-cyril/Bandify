import React from 'react';
import { Link } from 'react-router-dom';
import imageBandify from 'src/assets/images/bandify-about.jpg';
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
      <img className="about__img" src={imageBandify} alt="doigt sur les cordes de'une guitare" />
      <div className="about__text-container">
        <p className="about__text">
          L'idée du projet Bandify est parti d'un constat simple :
          Une difficulté dans le milieu de la musique à faire se reconcentrer des musiciens
          partageant la même passion.
        </p>
        <p className="about__text">
          Peu importe où vous habitez en France, Bandify se charge de vous proposer
          des profils adaptés en fonction de votre recherche.
        </p>
        <p className="about__text">
          Bandify a pour ambition de faciliter l'échange et le partage autour
          de la musique, et vous propose un service de messagerie instantanée.
        </p>
      </div>
    </div>
    <div className="about__us">
      <h2 className="about__us--title">L'équipe derrière le projet...</h2>
      <div className="about__us__img">
        <img className="about__us__img--one" src={imageAmaury} alt="Amaury" />
        <img className="about__us__img--one" src={imageArnaud} alt="Arnaud" />
        <img className="about__us__img--one" src={imageJeremy} alt="Jeremy" />
        <img className="about__us__img--one" src={imageCyril} alt="Amaury" />
        <img className="about__us__img--one" src={imageBaptiste} alt="Baptiste" />
      </div>
    </div>
    <div className="about__desc">
      Bandify a été crée par une équipe de 5 développeurs,
      tous issus de l'école O'Clock et réunis autour des mêmes passions.
    </div>

    <div className="about__button">
      <Link to="/contact" className="menu__nav--link about--link">Contactez-nous</Link>
    </div>
  </div>
);

export default About;
