/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from 'src/components/Player';

const Sounds = ({
  editSound, handleSubmitSound, editFormToggle, sounds,
}) => {
  const [sound, setSound] = useState();
  const [errorSound, setErrorSound] = useState('');
  useEffect(() => {
    if (sound) {
      const allowedExtension = /(\.mp3)$/i;
      if (!allowedExtension.exec(sound.name)) {
        return setErrorSound('Le fichier que vous avez séléctionné n\'a pas le format autorisé. Veuillez choisir un fichier son au format *.mp3');
      }
      if (sound.size > 8000000) return setErrorSound('Le fichier que vous séléctionné est trop volumineux. Veuillez choisir un fichier de taille 8mo maximum');
      return setErrorSound('');
    }
    return null;
  }, [sound]);
  return (
    <>
      {editSound ? (
        <form
          className="myprofile__user--picture-form"
          type="submit"
          onSubmit={(e) => handleSubmitSound(e, sound)}
        >
          <div className="myprofile__user--sound-desc">
            <p>Ajouter un son</p>
            <label htmlFor="new-sound" className="myprofile__user--sound-file">
              <input
                name="new-sound"
                id="new-sound"
                type="file"
                placeholder="Ajouter un son"
                onChange={(e) => setSound(e.target.files[0])}
              />
            </label>
            <button type="submit" disabled={errorSound}>Ajouter</button>
          </div>
          <button
            type="button"
            className="myprofile__user--close-edit-btn"
            onClick={() => editFormToggle('editSound')}
          >
            <i className="fas fa-times-circle" />
          </button>
          {errorSound && <p className="signup-submit__error">{errorSound}</p>}
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
