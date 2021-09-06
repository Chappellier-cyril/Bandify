import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import imageDescription from 'src/assets/images/bandify-desc.jpg';
import Searchbar from 'src/containers/Searchbar';
import Loader from 'src/components/Loader';
import { firstLetterToUpper, restToLower } from 'src/selectors/city';
import './style.scss';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const Home = ({
  users, isLogged, getMembers, searchedUsers, loginId, isLoading,
  resultsMessage, searchErrorMessage,
}) => {
  useEffect(() => {
    if (isLogged) {
      // on est connecté, on récupère les membres de la bdd via la requête à l'api
      // qui passe dans le userMiddleware
      getMembers();
    }
  }, [isLogged]);

  // TODO : filtrer pour ne plus avoir soi même dans les résultats
  const usersWithoutMe = users.filter((user) => user.id !== loginId);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    className: 'center',
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          vertical: true,
          verticalSwiping: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: false,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      {/* SI on est connecté, on affiche la page d'accueil avec la recherche
      et les cartes des membres sont cliquablent */}
      {isLogged ? (
        <>
          <Searchbar />

          {isLoading ? (
            <Loader />
          ) : (
            <div className="home__cards">
              {/* Option 1: on est loggué et on a effectué une recherche, on affiche le message
             contenant le résultat et on affiche les membres filtrés */}
              {searchedUsers.length !== 0 ? (
                <p className="home__cards-search-message">{resultsMessage}</p>
              ) : (<p className="home__cards-search-message">{searchErrorMessage}</p>)}

              {searchedUsers.length !== 0 ? (
                searchedUsers.map((searchedUser) => (
                  <Link to={`/member/${searchedUser.id}`} key={searchedUser.id} className="home__cards--users">
                    <div className="home__user--container">
                      {searchedUser.profil_image && <img className="home__user--picture" src={`${process.env.BANDIFY_API_URL}/avatar/${searchedUser.profil_image}`} alt="avatar du membre" />}
                      <div className="home__user--short">
                        <p className="home__user--name">{searchedUser.firstname} {searchedUser.lastname}</p>
                        {searchedUser.city && (
                          <p className="home__user--city">
                            {firstLetterToUpper(restToLower(searchedUser.city.city_name))}
                            ({searchedUser.city.department_code})
                          </p>
                        )}
                      </div>
                    </div>
                    {searchedUser.plays && (
                      <div className="home__instrument">
                        <p className="home__instrument--description">Ses instruments:</p>
                        <ul className="home__instrument--list">
                          {searchedUser.plays.map((play) => (
                            play.id && (
                            <li className="home__instrument__tag" key={play.id}>
                              <span className="home__instrument__tag--name">{play.instrument.instrument_name}</span>
                              <span className="home__instrument__tag--level">{play.level && play.level.level_name}</span>
                            </li>
                            )
                          ))}
                        </ul>
                      </div>
                    )}
                    {searchedUser.styles && (
                      <div className="home__style">
                        <p className="home__style--description">Ses goûts musicaux:</p>
                        <ul className="home__style--list">
                          {searchedUser.styles.map((musicStyle) => (
                            musicStyle.id && (
                            // Règle le souci musicStyle.id is undefined
                            <li className="home__style__tag" key={musicStyle.id}>
                              <span className="home__style__tag--name">{musicStyle.music_name}</span>
                            </li>
                            )
                          ))}
                        </ul>
                      </div>
                    )}
                  </Link>
                ))
              ) : (
              /* Option 2: on est loggué mais on a pas effectué de recherche,
             on affiche tous les membres */
                <>
                  {/* // On affiche uniquement les 5 premiers membres */}
                  <Slider {...sliderSettings}>
                    {usersWithoutMe.slice(0, 5).map((user) => (
                      <Link to={`/member/${user.id}`} key={user.id} className="home__cards--users">
                        <div className="home__user--container">
                          {user.profil_image && <img className="home__user--picture" src={`${process.env.BANDIFY_API_URL}/avatar/${user.profil_image}`} alt="avatar du membre" />}
                          <div className="home__user--short">
                            <p className="home__user--name">{user.firstname} {user.lastname}</p>
                            {user.city && (
                            <p className="home__user--city">
                              {firstLetterToUpper(restToLower(user.city.city_name))}
                              ({user.city.department_code})
                            </p>
                            )}
                          </div>
                        </div>
                        {user.plays && (
                        <div className="home__instrument">
                          <p className="home__instrument--description">Ses instruments:</p>
                          <ul className="home__instrument--list">
                            {user.plays.map((play) => (
                              play.id && (
                              <li className="home__instrument__tag" key={play.id}>
                                <span className="home__instrument__tag--name">{play.instrument.instrument_name}</span>
                                {play.level && <span className="home__instrument__tag--level">{play.level && play.level.level_name}</span>}
                              </li>
                              )
                            ))}
                          </ul>
                        </div>
                        )}
                        {user.styles && (
                        <div className="home__style">
                          <p className="home__style--description">Ses goûts musicaux:</p>
                          <ul className="home__style--list">
                            {user.styles.map((musicStyle) => (
                              musicStyle.id && (
                              // Règle le souci musicStyle.id is undefined
                              <li className="home__style__tag" key={musicStyle.id}>
                                <span className="home__style__tag--name">{musicStyle.music_name}</span>
                              </li>
                              )
                            ))}
                          </ul>
                        </div>
                        )}
                      </Link>
                    ))}
                  </Slider>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {/* SINON, on affiche la page d'accueil avec uniquement un aperçu du site :
          la description de Bandify, un boutton redirigeant vers l'inscription
           et des cartes de membres statiques */}
          <div className="home__desc__container">
            <img src={imageDescription} alt="une batterie et un micro sur pied" className="home__desc__img" />
            <div className="home__desc__text-container">
              <h2 className="home__desc__title">Bienvenue sur Bandify !</h2>
              <p className="home__desc__text">
                Le réseau social permettant de rencontrer des musiciens
                autour de chez toi.
              </p>
              <p className="home__desc__text">
                Il te suffit de t'inscrire, de renseigner ta ville, ton / tes instruments de prédilection,
                les musiciens que tu recherches :
              </p>
              <p className="home__desc__text">
                Bandify se charge de te proposer des profils adaptés à des besoins !
              </p>
            </div>
          </div>
          <p className="home__signup--btn">
            <Link to="/signup">Rejoindre la communauté</Link>
          </p>

          <p className="home__desc--teasing">Ils ont déjà rejoint !</p>
          <div className="home__cards">
            {/* fakes members */}
            {users.map((user) => (
              <div className="home__cards--users" key={user.id}>
                <img
                  className="home__user--picture"
                  src={`${process.env.BANDIFY_API_URL}/avatar/${user.profil_image}`}
                  alt="avatr de membre"
                />
                <p className="home__user--name">{user.firstname} {user.lastname}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

Home.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.object,
  ),
  isLogged: PropTypes.bool.isRequired,
  loginId: PropTypes.number,
  getMembers: PropTypes.func.isRequired,
  searchedUsers: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  resultsMessage: PropTypes.string,
  searchErrorMessage: PropTypes.string,
};
Home.defaultProps = {
  users: [{
    id: null,
    firstname: '',
  }],
  loginId: 0,
  searchedUsers: [],
  resultsMessage: '',
  searchErrorMessage: '',
};
export default Home;
