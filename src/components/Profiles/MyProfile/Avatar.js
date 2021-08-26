/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Avatar = ({
  editPhoto, handleSubmitPhoto, profil_image, editFormToggle,
}) => {
  const [avatar, setAvatar] = useState();
  return (
    <>
      {editPhoto ? (
        <form type="submit" onSubmit={(e) => handleSubmitPhoto(e, avatar)}>
          <div>
            <label htmlFor="avatar">
              Image de profil
              <input name="avatar" id="avatar" type="file" placeholder="Choisir une photo" onChange={(e) => setAvatar(e.target.files[0])} />
            </label>
          </div>
          <button type="submit">Envoyer</button>
          <button
            type="button"
            onClick={() => editFormToggle('editPhoto')}
          >
            <i className="fas fa-times-circle" />
          </button>
        </form>
      ) : (
        <div className="profile__card__image-container">
          {profil_image && <img src={`http://localhost:3000/images/${profil_image}`} alt="avatar du membre" className="profile__card__image-container__image" />}
          <span>
            <button
              type="button"
              onClick={() => editFormToggle('editPhoto')}
            >
              <i className="fas fa-pen" />
            </button>
          </span>
        </div>
      )}
    </>
  );
};

Avatar.propTypes = {
  profil_image: PropTypes.string,
  editFormToggle: PropTypes.func.isRequired,
  editPhoto: PropTypes.bool.isRequired,
  handleSubmitPhoto: PropTypes.func.isRequired,
};
Avatar.defaultProps = {
  profil_image: '',
};

export default Avatar;
