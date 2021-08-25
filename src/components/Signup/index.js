import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './style.scss';
import { getAge } from 'src/selectors/user';
import instrumentsData from 'src/data/instruments';
import levelsData from 'src/data/levels';
import musicStylesData from 'src/data/music_styles';
import Localisation from 'src/components/Localisation';

/*
Avec Redux :
 Vérifiez si l'utilisateur à plus de 18 ans
 Voir la solution la plus adapté pour l'envoi de la photo en BDD ( multer ou file-loader )
 TODO : Fonction SUBMIT LOGIN et autocompletion des champs CITY et ZIPCODE
*/

const Signup = ({
  firstName, lastName, dateOfBirth, description, email, password, city, code,
  instruments, styles, departement, region, success, error,
  onChangeInput, onSelectInput, addNewInputInstrument, removeInputInstrument,
  onStyleInput, addNewStyle, removeStyle, handleSubmitSignup,
}) => {
  // On utilise un useState pour stocker le fichier avatar reçu afin de le
  // transmettre à l'action REDUX suivante via le handleSignUp

  // on vérifie l'âge et on affiche un message d'erreur si l'utilisateur à moins de 15 ans
  const [errorAge, setErrorAge] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
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
  const [avatar, setAvatar] = useState();
  const getEmailValidation = () => {
    const regEx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    if (!regEx.exec(email)) {
      setErrorEmail(true);
    }
    else {
      setErrorEmail(false);
    }
  };
  return (
    <div className="signup-submit__container">
      {/* Si l'utilisateur est connecté on redirige vers la page d'accueil */}
      {success && <Redirect to="/login" />}
      { error !== '' && <p className="signup-submit__error">{error}</p> }
      {/* création des champs contrôlés pour les inputs du formulaire d'inscription grâce aux
      useState le state instrument sera un tableau qui récupère l'instrument et le level
      dans un objet */}
      <form type="submit" onSubmit={(e) => handleSubmitSignup(e, avatar)} autoComplete="off" className="signup-submit__form">
        <div className="signup-submit__group">
          <label htmlFor="firstName">
            <span className="signup-submit__group__label">Prénom</span>
            <input name="firstName" id="firstName" type="text" value={firstName} onChange={(e) => onChangeInput('firstName', e.target.value)} placeholder="Prénom" required />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">
            <span className="signup-submit__group__label">Nom</span>
            <input name="lastName" id="lastName" type="text" value={lastName} onChange={(e) => onChangeInput('lastName', e.target.value)} placeholder="Nom" required />
          </label>
        </div>
        <div>
          {/* //TODO => la date à l'inscription n'est pas en UTC: console.log(user) in myprofile */}
          <label htmlFor="dateOfBirth">
            <span className="signup-submit__group__label">Date de naissance</span>
            <input name="dateOfBirth" id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => onChangeInput('dateOfBirth', e.target.value)} required />
            {errorAge && <p className="signup-submit__error">Vous êtes trop jeune pour vous inscrire</p>}
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <span className="signup-submit__group__label">Adresse email</span>
            <input name="email" id="email" type="email" value={email} onChange={(e) => onChangeInput('email', e.target.value)} onBlur={getEmailValidation} placeholder="Email" required />
            {errorEmail && <p className="signup-submit__error">L'adresse email entrée n'est pas valide</p>}
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <span className="signup-submit__group__label">Mot de passe</span>
            <input name="password" id="password" type="password" value={password} onChange={(e) => onChangeInput('password', e.target.value)} placeholder="Mot de passe" required />
          </label>
        </div>
        <div>
          <label htmlFor="password-confirm">
            <span className="signup-submit__group__label">Confirmez Mot de passe</span>
            <input name="password-confirm" id="password-confirm" type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} placeholder="Confirmez le mot de passe" required />
          </label>
        </div>
        <div>
          {/* //TODO => la description vaut null quand on console.log(user) dans my profile */}
          <label htmlFor="description">
            <span className="signup-submit__group__label">Description</span>
            <textarea name="description" id="description" type="text" value={description} onChange={(e) => onChangeInput('description', e.target.value)} placeholder="Faire une courte description de vous" />
          </label>
        </div>
        <div>
          <label htmlFor="avatar">
            <span className="signup-submit__group__label">Image de profil</span>
            <input name="avatar" id="avatar" type="file" placeholder="Choisir une photo" onChange={(e) => setAvatar(e.target.files[0])} />
          </label>
        </div>
        <div className="signup-submit__group">
          <span className="signup-submit__group__label">Choississez un instrument et un niveau de pratique (optionel)</span>
          {// on boucle sur le tableau d'instruments
          instruments.map((instrument, index) => (
            // Prévoir de générer un id pour un code plus propre
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="signup-submit__group--instruments">
              <label htmlFor={`instrument${index}`}>
                <select name={`instrument${index}`} id={`instrument${index}`} onChange={(e) => onSelectInput(e, index, 'instrument')} required={index === 0} disabled={instrument.instrument && index < instruments.length - 1}>
                  <option value="">Choisir un instrument</option>
                  {
                    instrumentsData.map(({ name, id }) => (
                      <option value={id} key={id}>{name}</option>))
                  }
                </select>
              </label>
              <div>
                <select name={`level${index}`} id={`level${index}`} onChange={(e) => onSelectInput(e, index, 'level')} disabled={!instrument.instrument}>
                  <option value="">Choisir un niveau de pratique</option>
                  {
                    levelsData.map(({ name, id }) => <option value={id} key={id}>{name}</option>)
                  }
                </select>
                {
                  // Ici on disabled le bouton + si pas d'instrument choisi
                  // On ajoute un bouton  - à la ligne précédente si ajoute une ligne
                  // On limite le nombre de choix max du membre (ici 3 est le maximum)
                  // A voir combien d'instruments maximum on pourrais choisir
                  index < 3 // maximum de ligne d'instrument
                    && (index === instruments.length - 1
                      ? <button type="button" onClick={addNewInputInstrument} disabled={!instrument.instrument}>+</button>
                      : <button type="button" onClick={() => removeInputInstrument(index)}>-</button>
                    )
                }
              </div>
            </div>
          ))
          }
        </div>
        <div className="signup-submit__group">
          <span className="signup-submit__group__label">Choississez vos styles de musique préférés (4 max)</span>
          {styles.map((_, index) => (
            // prévoir de générer un id proprement
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <select name={`musicStyle${index}`} id={`musicStyle${index}`} onChange={(e) => onStyleInput(e, index)}>
                <option value="">Choisir un style de musique</option>
                {
                  musicStylesData.map((style) => (
                    <option value={style.id} key={style.id}>{style.name}</option>
                  ))
                }
              </select>
              {
                index < 2 // 4 choix de style max (à définir)
                  && (index === styles.length - 1
                    ? <button type="button" disabled={!styles[index]} onClick={addNewStyle}>+</button>
                    : <button type="button" onClick={() => removeStyle(index)}>-</button>
                  )
              }
            </div>
          ))}
        </div>
        <Localisation
          city={city}
          zipcode={code}
          departement={departement}
          region={region}
          onChangeInput={onChangeInput}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

Signup.propTypes = {
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
    PropTypes.number,
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
