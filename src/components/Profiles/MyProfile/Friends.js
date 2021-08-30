/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firstLetterToUpper, restToLower } from 'src/selectors/city';

const Friends = ({ friends }) => (
  friends.map((friend) => (
    <Link to={`/member/${friend.id}`} key={friend.id}>
      <div className="home__user--container">
        {friend.profil_image && <img className="home__user--picture" src={`http://localhost:3000/avatar/${friend.profil_image}`} alt="avatar du membre" />}
        <div className="home__user--short">
          <p className="home__user--name">{friend.firstname} {friend.lastname}</p>
          {friend.city && (
          <p className="home__user--city">
            {firstLetterToUpper(restToLower(friend.city.city_name))}
            ({friend.city.department_code})
          </p>
          )}
        </div>
      </div>
      {friend.plays && (
      <div className="home__instrument">
        <p className="home__instrument--description">Ses instruments:</p>
        <ul className="home__instrument--list">
          {friend.plays.map((play) => (
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
      {friend.styles && (
      <div className="home__style">
        <p className="home__style--description">Ses goûts musicaux:</p>
        <ul className="home__style--list">
          {friend.styles.map((musicStyle) => (
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
  )));

export default Friends;
