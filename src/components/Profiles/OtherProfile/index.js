/* eslint-disable camelcase */
import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { getAge } from 'src/selectors/user';

// == Import : local
import 'src/components/Profiles/style.scss';
import './style.scss';

const OtherProfile = ({ user }) => {
  const {
    plays, styles, profil_image,
  } = user;

  return (
    <div className="profile__page">
      {/* eslint-disable-next-line camelcase  */}
      <div className="profile">
        <div className="home__cards">
          {profil_image && <img src={`http://localhost:3000/images/${profil_image}`} alt="avatar du membre" />}
          <p>{user.firstname}, {user.lastname}</p>
          {user.city && (
          <span>
            {user.city.city_name} ({user.city.department_code})
          </span>
          )}
          <h2>{getAge(user.birthdate)} ans</h2>
          <button type="button">Ajouter à mes amis</button>
          {/* //TODO => la route invitation + vue conditionnelle pour afficher profil ami */}
          <p>{user.user_description}</p>
          <p>Ses instruments:</p>
          {plays && (
          <div className="home__cards">
            <ul>
              {plays.map((play) => (
                play.id && (
                <li key={play.id}>
                  {play.instrument.instrument_name}
                  {play.level && play.level.level_name}
                </li>
                )
              ))}
            </ul>
          </div>
          )}
          <p>Ses goûts musicaux:</p>
          {styles && (
          <div className="home__cards">
            <ul>
              {styles.map((musicStyle) => (
                musicStyle.id && (
                // Règle le souci musicStyle.id is undefined
                <li key={musicStyle.id}>
                  {musicStyle.music_name}
                </li>
                )
              ))}
            </ul>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

OtherProfile.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    birthdate: PropTypes.string,
    user_description: PropTypes.string,
    profil_image: PropTypes.string,
    city: PropTypes.shape({
      city_name: PropTypes.string,
      department_code: PropTypes.string,
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
    profil_image: '',
    city: {
      city_name: '',
      department_code: '',
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
