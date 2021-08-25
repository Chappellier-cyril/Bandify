/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes, { shape } from 'prop-types';
import { getAge } from 'src/selectors/user';
import Localisation from 'src/components/Localisation';

// == Import : local
import 'src/components/Profiles/style.scss';

const MyProfile = ({
  user,
  onWishToDeleteProfile,
  onDeleteProfile,
  isDeleteModalClosed,
  editFormToggle,
  editPhoto,
  editName,
  editCity,
  editBirthdate,
  editEmail,
  editPassword,
  editDescription,
  editInstruments,
  editStyles,
  firstName,
  lastName,
  dateOfBirth,
  emailInput,
  password,
  description,
  passwordShown,
  togglePasswordVisibility,
  onChangeInput,
  handleSubmitPhoto,
  handleSubmitName,
  handleSubmitEmail,
  handleSubmitBirthdate,
  handleSubmitDescription,

}) => {
  const {
    plays, city, styles, profil_image, email,
  } = user;

  // const [citySearch, setCity] = useState('');

  const [avatar, setAvatar] = useState();

  return (
    <>
      <div className="profile__page">
        {isDeleteModalClosed && (
        <div className="profile">
          <div className="profile__card">
            {editPhoto ? (
              // TODO => vérifier l'édition de la photo
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
              <div>
                {profil_image && <img src={`http://localhost:3000/images/${profil_image}`} alt="avatar du membre" />}
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
            {editName ? (
              <form type="submit" onSubmit={handleSubmitName}>
                <div>
                  <label htmlFor="firstName">
                    Prénom
                    <input name="firstName" id="firstName" type="text" value={firstName} onChange={(e) => onChangeInput('firstName', e.target.value)} placeholder="Prénom" required />
                  </label>
                </div>
                <div>
                  <label htmlFor="lastName">
                    Nom
                    <input name="lastName" id="lastName" type="text" value={lastName} onChange={(e) => onChangeInput('lastName', e.target.value)} placeholder="Nom" required />
                  </label>
                </div>
                <button type="submit">Envoyer</button>
                <button
                  type="button"
                  onClick={() => editFormToggle('editName')}
                >
                  <i className="fas fa-times-circle" />
                </button>
              </form>
            ) : (
              <p>
                {user.firstname}, {user.lastname}
                <span>
                  <button
                    type="button"
                    onClick={() => editFormToggle('editName')}
                  >
                    <i className="fas fa-pen" />
                  </button>
                </span>
              </p>
            )}
            {editCity ? (
              <form type="submit">
                {/* //TODO => Utiliser le composant Localisation */}
                {/* <Localisation
                  city={citySearch}
                  onChangeInput={setCity}
                /> */}
                <button
                  type="button"
                  onClick={() => editFormToggle('editCity')}
                >
                  <i className="fas fa-times-circle" />
                </button>
              </form>
            ) : (
              <h2>Ville:
                {city && (
                <span>
                  {city.city_name} ({city.code})
                </span>
                )}
                <span>
                  <button
                    type="button"
                    onClick={() => editFormToggle('editCity')}
                  >
                    <i className="fas fa-pen" />
                  </button>
                </span>
              </h2>
            )}
            {editBirthdate ? (
              <form type="submit" onSubmit={handleSubmitBirthdate}>
                <div>
                  <label htmlFor="dateOfBirth">
                    Date de naissance
                    <input name="dateOfBirth" id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => onChangeInput('dateOfBirth', e.target.value)} required />
                  </label>
                </div>
                <button type="submit">Envoyer</button>
                <button
                  type="button"
                  onClick={() => editFormToggle('editBirthdate')}
                >
                  <i className="fas fa-times-circle" />
                </button>
              </form>
            ) : (
              <h2>
                {getAge(user.birthdate)} ans
                <span>
                  <button
                    type="button"
                    onClick={() => editFormToggle('editBirthdate')}
                  >
                    <i className="fas fa-pen" />
                  </button>
                </span>
              </h2>
            )}
            {editEmail ? (
              <form type="submit" onSubmit={handleSubmitEmail}>
                <div>
                  <input
                    name="email"
                    type="text"
                    value={emailInput.trim()}
                    onChange={(e) => onChangeInput('email', e.target.value)}
                    placeholder="E-mail"
                    required
                  />
                </div>
                <button type="submit">Envoyer</button>
                <button
                  type="button"
                  onClick={() => editFormToggle('editEmail')}
                >
                  <i className="fas fa-times-circle" />
                </button>
              </form>
            ) : (
              <h2>
                Email: {email}
                <span>
                  <button
                    type="button"
                    onClick={() => editFormToggle('editEmail')}
                  >
                    <i className="fas fa-pen" />
                  </button>
                </span>
              </h2>
            )}
            {editPassword ? (
              // TODO => edit password
              <form type="submit">
                <div>
                  <input
                    name="password"
            // Si l'oeil est cliqué on affiche le mot de passe sinon on laisse en type password
                    type={passwordShown ? 'text' : 'password'}
                    value={password.trim()}
                    onChange={(e) => onChangeInput('password', e.target.value)}
                    placeholder="Mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {/* Si l'oeil est cliqué on change l'icone en oeil barré
            sinon on affiche l'oeil normal */}
                    {passwordShown ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => editFormToggle('editPassword')}
                >
                  <i className="fas fa-times-circle" />
                </button>
              </form>
            ) : (
              <h2>
                Mot de passe
                <span>
                  <button
                    type="button"
                    onClick={() => editFormToggle('editPassword')}
                  >
                    <i className="fas fa-pen" />
                  </button>
                </span>
              </h2>
            )}
            {editDescription ? (
              <form type="submit" onSubmit={handleSubmitDescription}>
                <div>
                  <label htmlFor="description">
                    Description
                    <textarea name="description" id="description" type="text" value={description} onChange={(e) => onChangeInput('user_description', e.target.value)} placeholder="Faire une courte description de vous" />
                  </label>
                </div>
                <button type="submit">Envoyer</button>
                <button
                  type="button"
                  onClick={() => editFormToggle('editDescription')}
                >
                  <i className="fas fa-times-circle" />
                </button>
              </form>
            ) : (
              <h2>
                Description
                <span>
                  <button
                    type="button"
                    onClick={() => editFormToggle('editDescription')}
                  >
                    <i className="fas fa-pen" />
                  </button>
                </span>
                <p>{user.user_description}</p>
              </h2>
            )}
            <button
              type="button"
              onClick={onWishToDeleteProfile}
            >Supprimer mon profil
            </button>
            <p>
              Mes instruments:
              {/* //TODO => edit */}
              <span>
                <button
                  type="button"
                  onClick={() => editFormToggle('editInstruments')}
                >
                  <i className="fas fa-pen" />
                </button>
              </span>
            </p>
            {plays && (
            <div className="home__cards">
              <ul>
                {plays.map((play) => (
                  <li key={play.id}>
                    {play.instrument.instrument_name}
                    {play.level && play.level.level_name}
                  </li>

                ))}
              </ul>
            </div>
            )}
            <p>
              Mes goûts musicaux:
              {/* //TODO => edit */}
              <span>
                <button
                  type="button"
                  onClick={() => editFormToggle('editStyles')}
                >
                  <i className="fas fa-pen" />
                </button>
              </span>
            </p>
            {styles && (
            <div className="home__cards">
              <ul>
                {styles.map((musicStyle) => (
                  (musicStyle !== 0) && (
                  // Règle le souci musicStyle.id is undefined
                  <li key={musicStyle.id}>
                    {musicStyle.music_name}
                  </li>
                  )
                ))}
              </ul>
            </div>
            )}
            <h2 className="profile__friends-title">Mes amis</h2>
          </div>
        </div>
        )}
        {!isDeleteModalClosed && (
        <div className="profile">
          <p>Êtes-vous sûr(e) de vouloir supprimer votre profil?</p>
          <button
            type="button"
            onClick={onDeleteProfile}
          >Oui
          </button>
          <button
            type="button"
            onClick={onWishToDeleteProfile}
          >Non
          </button>
        </div>
        )}
      </div>
    </>
  );
};

MyProfile.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    birthdate: PropTypes.string,
    email: PropTypes.string,
    user_description: PropTypes.string,
    profil_image: PropTypes.string,
    city: PropTypes.shape({
      city_name: PropTypes.string,
      code: PropTypes.string,
    }),
    plays: PropTypes.arrayOf(shape({
      instrument: PropTypes.shape({
        instrument_name: PropTypes.string,
      }),
      level: PropTypes.shape({
        level_name: PropTypes.string,
      }),
    })),
    styles: PropTypes.arrayOf(shape({
      music_name: PropTypes.string,
    })),
  }),
  onWishToDeleteProfile: PropTypes.func.isRequired,
  onDeleteProfile: PropTypes.func.isRequired,
  isDeleteModalClosed: PropTypes.bool.isRequired,
  editFormToggle: PropTypes.func.isRequired,
  editPhoto: PropTypes.bool.isRequired,
  editName: PropTypes.bool.isRequired,
  editCity: PropTypes.bool.isRequired,
  editBirthdate: PropTypes.bool.isRequired,
  editInstruments: PropTypes.bool.isRequired,
  editStyles: PropTypes.bool.isRequired,
  editEmail: PropTypes.bool.isRequired,
  editPassword: PropTypes.bool.isRequired,
  editDescription: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dateOfBirth: PropTypes.string,
  emailInput: PropTypes.string.isRequired,
  password: PropTypes.string,
  description: PropTypes.string.isRequired,
  passwordShown: PropTypes.bool.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  handleSubmitPhoto: PropTypes.func.isRequired,
  handleSubmitName: PropTypes.func.isRequired,
  handleSubmitEmail: PropTypes.func.isRequired,
  handleSubmitBirthdate: PropTypes.func.isRequired,
  handleSubmitDescription: PropTypes.func.isRequired,
};

MyProfile.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
    birthdate: '',
    user_description: '',
    email: '',
    profil_image: '',
    city: {
      city_name: '',
      code: '',
    },
    plays: [
      {
        instrument: {
          instrument_name: '',
        },
        level: {
          level_name: '',
        },
      },
    ],
    styles: [
      {
        music_name: '',
      },
    ],
  },
  dateOfBirth: '',
  firstName: '',
  lastName: '',
  password: '',
};

export default MyProfile;
