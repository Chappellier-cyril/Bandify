import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';

// == Import : local
import 'src/components/Profiles/style.scss';

const MyProfile = ({
  user,
  onWishToDeleteProfile,
  onDeleteProfile,
  isDeleteModalClosed,
  isProfileDeleted,
  deleteProfileMessage,
}) => {
  // eslint-disable-next-line camelcase
  const { plays, city } = user;

  return (
    <div className="profile__page">
      {/* eslint-disable-next-line camelcase  */}
      {console.log(plays)}
      {plays && city && isDeleteModalClosed ? (
        <div className="profile">
          <div className="profile__card">
            {/* //TODO => ajouter une photo */}
            <p>{user.firstname}, {user.lastname}</p>
            <h2>Ville: {city.city_name} ({city.zipcode})</h2>
            {/* //TODO => afficher l'age */}
            <p>{user.birthdate}</p>
            <button
              type="button"
              onClick={onWishToDeleteProfile}
            >Supprimer mon profil
            </button>
            {/* //TODO => désinscription */}
            <p>{user.user_description}</p>
            <p>Mes instruments:</p>
            <div className="home__cards">
              <ul>
                {plays.map((play) => (
                  <li key={play.id}>
                    {play.instrument.instrument_name}
                    {play.level.level_name}
                  </li>

                ))}
              </ul>
            </div>
            <p>Mes goûts musicaux:</p>
            {/* //TODO => la route back pour récupérer les goûts d'un membre */}
            <h2 className="profile__friends-title">Mes amis</h2>
          </div>
        </div>
      ) : (
        <>
          <p>Êtes-vous sûr(e) de vouloir supprimer votre profil?</p>
          <button
            type="button"
            onClick={onDeleteProfile}
          >Oui
          </button>
          <button
            type="button"
            onClick={onWishToDeleteProfile}
          >Non
          </button>
        </>
      )} {isProfileDeleted && (
        <>
          <p>{deleteProfileMessage}</p>
          <Link to="/">Revenir à la page d'accueil</Link>
        </>
      )}
    </div>
  );
};

MyProfile.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    birthdate: PropTypes.string,
    user_description: PropTypes.string,
    city: PropTypes.shape({
      city_name: PropTypes.string,
      zipcode: PropTypes.string,
    }),
    plays: PropTypes.arrayOf(shape({
      instrument: PropTypes.shape({
        instrument_name: PropTypes.string,
      }),
      level: PropTypes.shape({
        level_name: PropTypes.string,
      }),
    })),
  }),
  onWishToDeleteProfile: PropTypes.func.isRequired,
  onDeleteProfile: PropTypes.func.isRequired,
  isDeleteModalClosed: PropTypes.bool.isRequired,
  isProfileDeleted: PropTypes.bool.isRequired,
  deleteProfileMessage: PropTypes.string.isRequired,
};

MyProfile.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
    birthdate: '',
    user_description: '',
    member_city: {
      city_name: '',
      zipcode: '',
    },
    plays: [
      {
        instrument: {
          instrument_name: '',
        },
        level: {
          level_name: '',
        },
      },
    ],
  },
};

export default MyProfile;
