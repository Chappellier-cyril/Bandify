import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { getAge } from 'src/selectors/user';

// == Import : local
import 'src/components/Profiles/style.scss';

const OtherProfile = ({ user }) => {
  // eslint-disable-next-line camelcase
  const { plays, city, styles } = user;

  return (
    <div className="profile__page">
      {/* eslint-disable-next-line camelcase  */}
      {plays && city && styles ? (
        <div className="profile">
          <div className="profile__card">
            {/* //TODO => ajouter une photo */}
            <p>{user.firstname}, {user.lastname}</p>
            <h2>Ville: {city.city_name} ({city.code})</h2>
            <h2>{getAge(user.birthdate)} ans</h2>
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
            <div className="home__cards">
              <ul>
                {styles.map((musicStyle) => (
                  <li key={musicStyle.id}>
                    {musicStyle.music_name}
                  </li>

                ))}
              </ul>
            </div>
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
      code: PropTypes.string,
    }),
    plays: PropTypes.arrayOf(shape({
      instrument: PropTypes.shape({
        instrument_name: PropTypes.string,
      }),
      level: PropTypes.shape({
        level_name: PropTypes.string,
      }),
    })),
    styles: PropTypes.arrayOf(shape({
      music_name: PropTypes.string,
    })),
  }),
};

OtherProfile.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
    birthdate: '',
    user_description: '',
    city: {
      city_name: '',
      code: '',
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
    styles: [
      {
        music_name: '',
      },
    ],
  },
};

export default OtherProfile;
