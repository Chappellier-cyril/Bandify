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
    <div className="profile-menu__container">
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
      <div className="profile-menu__button-container">
        <button
          type="button"
          onClick={toggleIsEditing}
          className="profile-menu__button profile-menu__button--edit-profile"
        >Editer mon profil
        </button>
      </div>
      <div className="profile-menu__button-container">
        <button
          type="button"
          onClick={onWishToDeleteProfile}
          className="profile-menu__button profile-menu__button--delete-profile"
        >Supprimer mon profil
        </button>
      </div>

      <div>
        <form
          type="submit"
          onSubmit={(e) => handleSubmitSound(e, sound)}
        >
          <p>Ajouter un son</p>
          <label htmlFor="new-sound" className="profile-menu__label profile-menu__label--sound-file">
            <input
              name="new-sound"
              id="new-sound"
              type="file"
              placeholder="Ajouter un son"
              onChange={(e) => setSound(e.target.files[0])}
              className="profile-menu__button profile-menu__button--input-sound"
            />
            <button type="submit" disabled={errorSound} className="profile-menu__button profile-menu__button--send-sound">Ajouter</button>
            {errorSound && <p className="signup-submit__error">{errorSound}</p>}
          </label>
        </form>
      </div>
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
