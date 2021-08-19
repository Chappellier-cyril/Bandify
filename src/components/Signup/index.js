import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import instrumentsData from 'src/data/instruments';
import levelsData from 'src/data/levels';
import musicStylesData from 'src/data/music_styles';
import Localisation from './Localisation';

/*
Avec Redux :
 Vérifiez si l'utilisateur à plus de 18 ans
 Voir la solution la plus adapté pour l'envoi de la photo en BDD ( multer ou file-loader )
 TODO : Fonction SUBMIT LOGIN et autocompletion des champs CITY et ZIPCODE
*/

const Signup = ({
  firstName, lastName, dateOfBirth, description, email, password, city, zipcode,
  instruments, styles,
  onChangeInput, onSelectInput, addNewInputInstrument, removeInputInstrument,
  onStyleInput, addNewStyle, removeStyle,
}) => (
// création des champs contrôlés pour les inputs du formulaire d'inscription grâce aux useState
// le state instrument sera un tableau qui récupère l'instrument et le level dans un objet
  <form type="submit">
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
    <div>
      <label htmlFor="dateOfBirth">
        Date de naissance
        <input name="dateOfBirth" id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => onChangeInput('dateOfBirth', e.target.value)} required />
      </label>
    </div>
    <div>
      <label htmlFor="email">
        Adresse email
        <input name="email" id="email" type="email" value={email} onChange={(e) => onChangeInput('email', e.target.value)} placeholder="Email" required />
      </label>
    </div>
    <div>
      <label htmlFor="password">
        Mot de passe
        <input name="password" id="password" type="password" value={password} onChange={(e) => onChangeInput('password', e.target.value)} placeholder="Mot de passe" required />
      </label>
    </div>
    <div>
      <label htmlFor="description">
        Description
        <textarea name="description" id="description" type="text" value={description} onChange={(e) => onChangeInput('description', e.target.value)} placeholder="Faire une courte description de vous" />
      </label>
    </div>
    <div>
      <label htmlFor="avatar">
        Image de profil
        <input name="avatar" id="avatar" type="file" placeholder="Choisir une photo" />
      </label>
    </div>

    {
      // on boucle sur le tableau d'instruments
      instruments.map((instrument, index) => (
        // Prévoir de générer un id pour un code plus propre
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <select name={`instrument${index}`} id={`instrument${index}`} onChange={(e) => onSelectInput(e, index, 'instrument')} required disabled={instrument.instrument && index < instruments.length - 1}>
            <option value="">Choisir un instrument</option>
            {
              instrumentsData.map(({ name, id }) => <option value={id} key={id}>{name}</option>)
            }
          </select>
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
      ))
    }
    {
      /*
        TODO => ville code postal => voir pour de l'autocomplétion
        avec appel API code postaux la poste ou API / Gouv
      */
      styles.map((_, index) => (
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
      ))
    }
    <Localisation city={city} zipcode={zipcode} onChangeInput={onChangeInput} />
    <button type="submit">SUBMIT</button>
  </form>
);

Signup.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  dateOfBirth: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  // a voir pour le type du zipcode
  zipcode: PropTypes.string,
  instruments: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  styles: PropTypes.arrayOf(
    PropTypes.number,
  ),
  onChangeInput: PropTypes.func.isRequired,
  onSelectInput: PropTypes.func.isRequired,
  addNewInputInstrument: PropTypes.func.isRequired,
  removeInputInstrument: PropTypes.func.isRequired,
  onStyleInput: PropTypes.func.isRequired,
  addNewStyle: PropTypes.func.isRequired,
  removeStyle: PropTypes.func.isRequired,
};
Signup.defaultProps = {
  styles: [0],
  zipcode: '',
};

export default Signup;
