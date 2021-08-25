import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Searchbar from 'src/containers/Searchbar';
import './style.scss';

const Home = ({
  users, isLogged, getMembers, searchedUsers, searchMessage,
}) => {
  useEffect(() => {
    if (isLogged) {
      // on est connecté, on récupère les membres de la bdd via la requête à l'api
      // qui passe dans le userMiddleware
      getMembers();
    }
  }, [isLogged]);

  return (
    <div className="main">
      {/* SI on est connecté, on affiche la page d'accueil avec la recherche
      et les cartes des membres sont cliquablent */}
      {isLogged ? (
        <>
          <Searchbar />

          <div className="home__cards">
            {/* Option 1: on est loggué et on a effectué une recherche, on affiche le message
             contenant le résultat et on affiche les membres filtrés */}
            {/* {searchedUsers && (
              <p>{searchMessage}</p>
            )} */}
            {searchedUsers.length !== 0 ? (
              searchedUsers.map(({ id, firstname }) => (
                <Link to={`/member/${id}`} key={id} className="home__cards-users">
                  <p>{firstname}</p>
                </Link>
              ))
            ) : (
              /* Option 2: on est loggué mais on a pas effectué de recherche,
             on affiche tous les membres */
              users.map(({ id, firstname }) => (
                <Link to={`/member/${id}`} key={id} className="home__cards-users">
                  <p>{firstname}</p>
                </Link>
              ))
            )}
          </div>
        </>
      ) : (
        <>
          {/* SINON, on affiche la page d'accueil avec uniquement un aperçu du site :
          la description de Bandify, un boutton redirigeant vers l'inscription
           et des cartes de membres statiques */}
          <p className="home__desc">
            Bienvenue sur Bandify ! <br /> Le réseau social permettant de rencontrer des musiciens
            autour de chez toi.
            Il te suffit de t'inscrire, de renseigner ton/tes instrument(s) de prédilection,
            les musiciens que tu recherches (bassiste, batteur...) et Bandify
            se charge de te proposer des profils adaptés à des besoins !
          </p>

          <Link to="/signup" className="home__signup-btn">Rejoindre la communauté</Link>

          <p className="home__desc-teasing">Ils ont déjà rejoint</p>
          <div className="home__cards">
            {/* fakes members */}
            {users.map(({ id, firstname }) => (
              <p className="home__cards-users" key={id}>{firstname}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

Home.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.object,
  ),
  isLogged: PropTypes.bool.isRequired,
  getMembers: PropTypes.func.isRequired,
  searchedUsers: PropTypes.array,
  searchMessage: PropTypes.string,
};
Home.defaultProps = {
  users: [{
    id: null,
    firstname: '',
  }],
  searchedUsers: [],
  searchMessage: '',
};
export default Home;
