/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './style.scss';
import { getAge } from 'src/selectors/user';
import Localisation from 'src/components/Localisation';

/*
Avec Redux :
 Vérifiez si l'utilisateur à plus de 18 ans
 Voir la solution la plus adapté pour l'envoi de la photo en BDD ( multer ou file-loader )
*/

const Signup = ({
  firstName, lastName, dateOfBirth, description, email, password, city, code,
  instruments, styles, departement, region, success, error,
  instrumentsData, levelsData, musicStylesData,
  onChangeInput, onSelectInput, addNewInputInstrument, removeInputInstrument,
  onStyleInput, addNewStyle, removeStyle, handleSubmitSignup,
}) => {
  console.log(instrumentsData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [error]);
  // On utilise un useState pour stocker le fichier avatar reçu afin de le
  // transmettre à l'action REDUX suivante via le handleSignUp

  // on vérifie l'âge et on affiche un message d'erreur si l'utilisateur à moins de 15 ans
  const [errorAge, setErrorAge] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorPasswordCheck, setErrorPasswordCheck] = useState('');
  const [avatar, setAvatar] = useState();
  const [errorAvatar, setErrorAvatar] = useState('');
  useEffect(() => {
    if (dateOfBirth !== '') {
      const age = getAge(dateOfBirth);
      if (age < 15) {
        setErrorAge(true);
      }
      else {
        setErrorAge(false);
      }
    }
  }, [dateOfBirth]);
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

  useEffect(() => {
    if (passwordCheck) {
      if (password !== passwordCheck) return setErrorPasswordCheck('Les mots de passes renseignés ne correspondent pas');
      return setErrorPasswordCheck('');
    }
    return setErrorPasswordCheck('');
  }, [passwordCheck]);
  useEffect(() => {
    if (password) {
      if (password.length < 6) return setErrorPassword('Le mot de passe doit contenir au moins 6 charactères');
      return setErrorPassword('');
    }
    return setErrorPassword('');
  }, [password]);
  // TODO voir pourquoi l'emial ne se valide pas à l'autocompletion
  useEffect(() => {
    if (email) {
      const regEx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
      if (!regEx.exec(email)) {
        setErrorEmail(true);
      }
      else {
        setErrorEmail(false);
      }
    }
  }, [email]);

  return (
    <div className="signup-submit__container">
      <h2 className="login__form-title">Inscription</h2>
      {/* Si l'utilisateur est connecté on redirige vers la page d'accueil */}
      {success && <Redirect to="/login" />}
      { error !== '' && <p className="signup-submit__error">{error}</p> }
      {/* création des champs contrôlés pour les inputs du formulaire d'inscription grâce aux
      useState le state instrument sera un tableau qui récupère l'instrument et le level
      dans un objet */}
      <form type="submit" onSubmit={(e) => handleSubmitSignup(e, avatar)} autoComplete="off" className="signup-submit__form">
        <div className="signup-submit__group">
          <label htmlFor="firstName">
            <input className="signup-submit__group__input" name="firstName" id="firstName" type="text" value={firstName} onChange={(e) => onChangeInput('firstName', e.target.value)} placeholder="Prénom*" required />
          </label>
        </div>
        <div className="signup-submit__group">
          <label htmlFor="lastName">
            <input className="signup-submit__group__input" name="lastName" id="lastName" type="text" value={lastName} onChange={(e) => onChangeInput('lastName', e.target.value)} placeholder="Nom*" required />
          </label>
        </div>
        <div className="signup-submit__group">
          <label htmlFor="dateOfBirth">
            <span className="signup-submit__group__label">Date de naissance*</span>
            <input className={`signup-submit__group__input signup-submit__group__input--birthdate ${errorAge && 'signup-submit__error-border'}`} name="dateOfBirth" id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => onChangeInput('dateOfBirth', e.target.value)} required />
            {errorAge && <p className="signup-submit__error">Vous êtes trop jeune pour vous inscrire</p>}
          </label>
        </div>
        <div className="signup-submit__group">
          <label htmlFor="email">
            <input className={`signup-submit__group__input ${errorEmail && 'signup-submit__error-border'}`} name="email" id="email" type="email" value={email} onChange={(e) => onChangeInput('email', e.target.value)} placeholder="Email*" required />
            {errorEmail && <p className="signup-submit__error">L'adresse email entrée n'est pas valide</p>}
          </label>
        </div>
        <div className="signup-submit__group">
          <label htmlFor="password">
            <input
              className="signup-submit__group__input"
              name="password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => onChangeInput('password', e.target.value)}
              placeholder="Mot de passe*"
              required
            />
            {errorPassword && <p className="signup-submit__error">{errorPassword}</p>}
          </label>
        </div>
        <div className="signup-submit__group">
          <label htmlFor="password-confirm">
            <input
              className="signup-submit__group__input"
              name="password-confirm"
              id="password-confirm"
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              placeholder="Confirmez le mot de passe*"
              required
            />
            {errorPasswordCheck && <p className="signup-submit__error">{errorPasswordCheck}</p>}
          </label>
        </div>
        <div className="signup-submit__group signup-submit__group--textarea">
          <label htmlFor="description">
            <span className="signup-submit__group__label">Description</span>
            <textarea className="signup-submit__group__input signup-submit__group__input--textarea" name="description" id="description" type="text" value={description} onChange={(e) => onChangeInput('description', e.target.value)} placeholder="Une petite présentation de vous, afin de permettre à nos membres de mieux vous connaître ... " />
          </label>
        </div>
        <div className="signup-submit__choose-file">
          <span className="signup-submit__group__label">Image de profil</span>
          <label htmlFor="avatar" className="signup-submit__group--avatar__container">
            <span className="signup-submit__group--avatar__container__label">Choisir un fichier</span>
            <input className="signup-submit__group__input--avatar" name="avatar" id="avatar" type="file" placeholder="Choisir une photo" onChange={(e) => setAvatar(e.target.files[0])} />
            {errorAvatar && <p className="signup-submit__error">{errorAvatar}</p>}
          </label>
          <div className="signup-submit__container-shown-avatar">
            {avatar && <img className="signup-submit__show-avatar" src={URL.createObjectURL(avatar)} alt={`Votre fichier séléctionné est ${avatar.name}`} />}
          </div>
        </div>
        <div className="signup-submit__group signup-submit__group--inst-container">
          <span className="signup-submit__group__label">Choississez au moins un instrument et un niveau de pratique (optionel)</span>
          {// on boucle sur le tableau d'instruments
          instruments && instruments.map((instrument, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="signup-submit__group--instruments">
              <label htmlFor={`instrument${index}`} className="signup-submit__group--instruments__input-container">
                <select className="signup-submit__group__select" name="instrument" id={`instrument${instrument.instrument}`} onChange={(e) => onSelectInput(e, index, 'instrument')} required={index === 0} disabled={instrument.instrument && index < instruments.length - 1}>
                  <option value="">Choisir un instrument</option>
                  {
                    instrumentsData && instrumentsData.map(({ instrument_name, id }) => (
                      <option value={id} key={instrument_name}>{instrument_name}</option>))
                  }
                </select>
                <select className="signup-submit__group__select" name={`level${index}`} id={`level${index}`} onChange={(e) => onSelectInput(e, index, 'level')} disabled={!instrument.instrument}>
                  <option value="">Choisir un niveau de pratique</option>
                  {
                    levelsData && levelsData.map(({ level_name, id }) => (
                      <option value={id} key={level_name + id}>{level_name}</option>))
                  }
                </select>
              </label>
              <div className="signup-submit__group--instruments__button-container">
                {// Ici on disabled le bouton + si pas d'instrument choisi
                // On ajoute un bouton  - à la ligne précédente si ajoute une ligne
                // On limite le nombre de choix max du membre (ici 3 est le maximum)
                // A voir combien d'instruments maximum on pourrais choisir
                index < 3 // maximum de ligne d'instrument
                && (index === instruments.length - 1
                  ? (
                    <button
                      className="signup-submit__group--instruments__button"
                      type="button"
                      onClick={addNewInputInstrument}
                      disabled={!instrument.instrument}
                    ><i className="fas fa-plus" />
                    </button>
                  )
                  : (
                    <button
                      className="signup-submit__group--instruments__button"
                      type="button"
                      onClick={() => removeInputInstrument(index)}
                    ><i className="fas fa-minus" />
                    </button>
                  )
                )
                }
              </div>

            </div>
          ))
          }
        </div>
        <div className="signup-submit__group--styles">
          <span className="signup-submit__group__label">Choississez vos styles de musique préférés (4 max)</span>

          {styles && styles.map((s, index) => (
            // prévoir de générer un id proprement
            <div key={`style select ${index}`} className="signup-submit__group--styles__container">
              <div className="signup-submit__group--styles__input-container">
                <select className="signup-submit__group__select" name={`musicStyle${index}`} id={`musicStyle${index}`} onChange={(e) => onStyleInput(e, index)}>
                  <option value="">Choisir un style de musique</option>
                  {
                    musicStylesData && musicStylesData.map((style) => (
                      <option value={style.id} key={style.music_name}>
                        {style.music_name}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div key={`style${index}`} className="signup-submit__group--styles__button-container">
                {
                  index < 2 // 4 choix de style max (à définir)
                    && (index === styles.length - 1
                      ? (
                        <button
                          className="signup-submit__group--styles__button"
                          type="button"
                          disabled={!styles[index]}
                          onClick={addNewStyle}
                        >
                          <i className="fas fa-plus" />
                        </button>
                      )
                      : (
                        <button
                          className="signup-submit__group--styles__button"
                          type="button"
                          onClick={() => removeStyle(index)}
                        >
                          <i className="fas fa-minus" />
                        </button>
                      )
                    )
                }
              </div>
            </div>
          ))}
        </div>
        <div className="signup-submit__group--localisation">
          <span className="signup-submit__group__label">Ville</span>
          <Localisation
            city={city}
            zipcode={code}
            departement={departement}
            region={region}
            onChangeInput={onChangeInput}
          />
        </div>
        <button
          className="signup-submit__form__submit"
          type="submit"
          disabled={!firstName || !lastName || !dateOfBirth
            || !email || !password || !passwordCheck || !instruments[0].instrument || !city
            || errorPasswordCheck || errorPassword || errorEmail || errorAge || errorAvatar
            || error}
        >ENVOYER
        </button>
      </form>
    </div>
  );
};

Signup.propTypes = {
  instrumentsData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  levelsData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  musicStylesData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  dateOfBirth: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  departement: PropTypes.shape().isRequired,
  region: PropTypes.shape().isRequired,
  code: PropTypes.string.isRequired,
  instruments: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  styles: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onSelectInput: PropTypes.func.isRequired,
  addNewInputInstrument: PropTypes.func.isRequired,
  removeInputInstrument: PropTypes.func.isRequired,
  onStyleInput: PropTypes.func.isRequired,
  addNewStyle: PropTypes.func.isRequired,
  removeStyle: PropTypes.func.isRequired,
  handleSubmitSignup: PropTypes.func.isRequired,
};

export default Signup;
