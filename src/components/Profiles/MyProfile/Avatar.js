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
        <form
          className="myprofile__user--picture-form"
          type="submit"
          onSubmit={(e) => handleSubmitPhoto(e, avatar)}
        >
          <div className="myprofile__user--picture-desc">
            <p>Image de profil</p>
            <label htmlFor="avatar" className="myprofile__user--picture-file">
              <input
                name="avatar"
                id="avatar"
                type="file"
                placeholder="Choisir une photo"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </label>
            <button type="submit">Envoyer</button>
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
