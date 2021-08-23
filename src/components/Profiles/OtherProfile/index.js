import React from 'react';
import PropTypes, { shape } from 'prop-types';

// == Import : local
import 'src/components/Profiles/style.scss';

const OtherProfile = ({ user }) => {
  // eslint-disable-next-line camelcase
  const { plays, city } = user;

  return (
    <div className="profile__page">
      {/* eslint-disable-next-line camelcase  */}
      {plays && city ? (
        <div className="profile">
          <div className="profile__card">
            {/* //TODO => ajouter une photo */}
            <p>{user.firstname}, {user.lastname}</p>
            <h2>Ville: {city.city_name} ({city.zipcode})</h2>
            {/* //TODO => afficher l'age */}
            <p>{user.birthdate}</p>
            <button type="button">Ajouter à mes amis</button>
            {/* //TODO => la route invitation + vue conditionnelle pour afficher profil ami */}
            <p>{user.user_description}</p>
            <p>Ses instruments:</p>
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
            <p>Ses goûts musicaux:</p>
            {/* //TODO => la route back pour récupérer les goûts d'un membre */}
          </div>
        </div>
      ) : (null) }
    </div>
  );
};

OtherProfile.propTypes = {
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
};

OtherProfile.defaultProps = {
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

export default OtherProfile;
