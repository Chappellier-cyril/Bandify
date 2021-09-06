import React, {} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from 'src/components/Player';

const Sounds = ({ sounds }) => (
  <div className="profile__player">
    <h2 className="profile__player__title">Mes sons</h2>
    <ul className="profile__player__sounds-list">
      {
      sounds.map((s) => (
        <li key={s.key} className="profile__player__li">
          <p>{s.name}</p>
          <AudioPlayer
            url={`${process.env.BANDIFY_API_URL}/sound/${s.key}`}
          />
        </li>
      ))
    }
    </ul>
  </div>
);

Sounds.propTypes = {
  sounds: PropTypes.array.isRequired,
};

export default Sounds;
