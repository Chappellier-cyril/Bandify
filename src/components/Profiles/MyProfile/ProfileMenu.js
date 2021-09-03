import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Password from './Password';
// TODO faire le container pour soulager le composant myProfile
const ProfileMenu = ({
  onWishToDeleteProfile, editPassword, handleSubmitPassword, toggleIsEditing,
  passwordShown, password, togglePasswordVisibility, editFormToggle, onChangeProfileInput, userId,
  handleSubmitSound,
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
    <div>
      <h2>Menu</h2>
      <Password
        editPassword={editPassword}
        handleSubmitPassword={handleSubmitPassword}
        passwordShown={passwordShown}
        password={password}
        togglePasswordVisibility={togglePasswordVisibility}
        editFormToggle={editFormToggle}
        onChangeProfileInput={onChangeProfileInput}
        myId={userId}
      />
      <div className="myprofile__delete-btn--container">
        <div className="myprofile__delete-btn--container">
          <button
            type="button"
            onClick={toggleIsEditing}
            className="myprofile__user--delete-btn"
          >Editer mon profil
          </button>
        </div>
        <button
          type="button"
          onClick={onWishToDeleteProfile}
          className="myprofile__user--delete-btn"
        >Supprimer mon profil
        </button>
      </div>
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
      <div />
    </div>
  );
};

ProfileMenu.propTypes = {
  onWishToDeleteProfile: PropTypes.func.isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
  editPassword: PropTypes.bool.isRequired,
  handleSubmitPassword: PropTypes.func.isRequired,
  passwordShown: PropTypes.bool.isRequired,
  password: PropTypes.string,
  togglePasswordVisibility: PropTypes.func.isRequired,
  editFormToggle: PropTypes.func.isRequired,
  onChangeProfileInput: PropTypes.func.isRequired,
  userId: PropTypes.number,
  handleSubmitSound: PropTypes.func.isRequired,
};

ProfileMenu.defaultProps = {
  userId: 0,
  password: '',
};

export default ProfileMenu;
