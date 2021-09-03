/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from 'src/components/Player';

const Sounds = ({
  editSound, handleSubmitSound, editFormToggle, sounds,
}) => {
  const [sound, setSound] = useState();
  return (
    <>
      {editSound ? (
        <form
          className="myprofile__user--picture-form"
          type="submit"
          onSubmit={(e) => handleSubmitSound(e, sound)}
        >
          <div className="myprofile__user--sound-desc">
            <p>Image de profil</p>
            <label htmlFor="new-sound" className="myprofile__user--sound-file">
              <input
                name="new-sound"
                id="new-sound"
                type="file"
                placeholder="Ajouter un son"
                onChange={(e) => setSound(e.target.files[0])}
              />
            </label>
            <button type="submit">Envoyer</button>
          </div>
          <button
            type="button"
            className="myprofile__user--close-edit-btn"
            onClick={() => editFormToggle('editSound')}
          >
            <i className="fas fa-times-circle" />
          </button>
        </form>
      ) : (
        <div className="myprofile__user--sounds">
          <h2>Mes sons</h2>
          {
            sounds && sounds.map((s) => (
              <div>
                <p>{s.name}</p>
                <AudioPlayer
                  url={`${process.env.BANDIFY_API_URL}/sound/${s.key}`}
                />
              </div>
            ))
          }
          <button
            type="button"
            onClick={() => editFormToggle('editSound')}
            className="myprofile__user--edit"
          >
            <i className="fas fa-pen" />
          </button>
        </div>
      )}
    </>
  );
};

Sounds.propTypes = {
  editFormToggle: PropTypes.func.isRequired,
  editSound: PropTypes.bool.isRequired,
  handleSubmitSound: PropTypes.func.isRequired,
  sounds: PropTypes.array.isRequired,
};

export default Sounds;
