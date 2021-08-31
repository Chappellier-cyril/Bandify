/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { firstLetterToUpper, restToLower } from 'src/selectors/city';

const Friends = ({ friends }) => (
  friends.map((friend) => (
    <div className="myprofile__friends">
      <Link to={`/member/${friend.id}`} key={friend.id}>
        <div className="myprofile__user--container">
          <p className="myprofile__friends--description">Mes amis:</p>
          {friend.profil_image && <img className="myprofile__friends--picture" src={`${process.env.BANDIFY_API_URL}/avatar/${friend.profil_image}`} alt="avatar du membre" />}
          <div className="myprofile__user--short">
            <p className="myprofile__user--name">{friend.firstname} {friend.lastname}</p>
            {friend.city && (
            <p className="myprofile__user--city">
              {firstLetterToUpper(restToLower(friend.city.city_name))}
              ({friend.city.department_code})
            </p>
            )}
          </div>
        </div>
        {friend.plays && (
        <div className="myprofile__instrument">
          <p className="myprofile__instrument--description">Ses instruments:</p>
          <ul className="myprofile__instrument--list">
            {friend.plays.map((play) => (
              play.id && (
              <li className="myprofile__instrument__tag" key={play.id}>
                <span className="myprofile__instrument__tag--name">{play.instrument.instrument_name}</span>
                <span className="myprofile__instrument__tag--level">{play.level && play.level.level_name}</span>
              </li>
              )
            ))}
          </ul>
        </div>
        )}
        {friend.styles && (
        <div className="myprofile__style">
          <p className="myprofile__style--description">Ses goûts musicaux:</p>
          <ul className="myprofile__style--list">
            {friend.styles.map((musicStyle) => (
              musicStyle.id && (
              // Règle le souci musicStyle.id is undefined
              <li className="myprofile__style__tag" key={musicStyle.id}>
                <span className="myprofile__style__tag--name">{musicStyle.music_name}</span>
              </li>
              )
            ))}
          </ul>
        </div>
        )}
      </Link>
    </div>
  )));

export default Friends;
