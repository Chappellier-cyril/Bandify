import React, {} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from 'src/components/Player';

const Sounds = ({ sounds }) => (
  sounds && (
    <>
      <div className="myprofile__user--sounds">
        <h2>Mes sons</h2>
        {
            sounds.map((s) => (
              <div key={s.key}>
                <p>{s.name}</p>
                <AudioPlayer
                  url={`${process.env.BANDIFY_API_URL}/sound/${s.key}`}
                />
              </div>
            ))
          }
      </div>
    </>
  )
);

Sounds.propTypes = {
  sounds: PropTypes.array.isRequired,
};

export default Sounds;
