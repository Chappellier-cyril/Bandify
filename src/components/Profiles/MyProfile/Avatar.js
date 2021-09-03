/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Avatar = ({
  editPhoto, handleSubmitPhoto, profil_image, editFormToggle,
}) => {
  const [avatar, setAvatar] = useState();
  const [errorAvatar, setErrorAvatar] = useState('');
  useEffect(() => {
    if (avatar) {
      const allowedExtension = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtension.exec(avatar.name)) {
        return setErrorAvatar('Le fichier que vous avez séléctionné n\'a pas le format autorisé. Veuillez choisir un fichier image au format *.jpeg / *.png / *.jpg');
      }
      if (avatar.size > 2000000) return setErrorAvatar('Le fichier que vous séléctionné est trop volumineux. Veuillez choisir un fichier de taille 2mo maximum');
      return setErrorAvatar('');
    }
    return null;
  }, [avatar]);
  return (
    <>
      {editPhoto ? (
        <form
          className="myprofile__user--picture-form"
          type="submit"
          onSubmit={(e) => handleSubmitPhoto(e, avatar)}
        >
          <div className="myprofile__user--picture-desc">
            <p>Image de profil</p>
            <label htmlFor="avatar" className="signup-submit__group--avatar__container">
              <span className="signup-submit__group--avatar__container__label">Choisir une photo</span>
              <input
                name="avatar"
                id="avatar"
                type="file"
                placeholder="Choisir une photo"
                className="signup-submit__group__input--avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              {errorAvatar && <p className="signup-submit__error">{errorAvatar}</p>}
              <div className="signup-submit__container-shown-avatar">
                {avatar && <img className="signup-submit__show-avatar" src={URL.createObjectURL(avatar)} alt={`Votre fichier séléctionné est ${avatar.name}`} />}
              </div>
            </label>
            <button type="submit" disabled={errorAvatar}>Envoyer</button>
          </div>
          <button
            type="button"
            className="myprofile__user--close-edit-btn"
            onClick={() => editFormToggle('editPhoto')}
          >
            <i className="fas fa-times-circle" />
          </button>
        </form>
      ) : (
        <div className="myprofile__user--avatar">
          {profil_image && <img className="myprofile__user--picture" src={`${process.env.BANDIFY_API_URL}/avatar/${profil_image}`} alt="avatar du membre" />}
          <button
            type="button"
            onClick={() => editFormToggle('editPhoto')}
            className="myprofile__user--edit-photo"
          >
            <i className="fas fa-pen" />
          </button>
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
