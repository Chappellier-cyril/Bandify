import React, { useState } from 'react';

import instrumentsData from 'src/data/instruments';
import levelsData from 'src/data/levels';

/*
Avec Redux :
 Prévoir les appels à la BDD pour vérifiez si l'email existe déjà l'email
 Vérifiez si l'utilisateur à plus de 15 ans
*/

const Signup = () => {
  // création des champs contrôlés pour les inputs du formulaire d'inscription grâce aux useState
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfbirth, setDateOfBirth] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('');
  // le state instrument sera un tableau qui récupère l'instrument et le niveau dans un objet
  const [instruments, setInstruments] = useState([]);

  /* fonction générique pour changer les inputs afin d'avoir des composants contrôlées
    @params setState => fonction du useState de l'input contrôlé
    @params event => récupère la valeur de l'input
  */
  const onChangeInput = (setState, event) => {
    setState(event.target.value);
  };
  // fonction qui associe l'instrument séléctionné avec le level dans
  // un objet du tableau de state instruments
  const onSelectLevelSetInstruments = (e) => {
    if (selectedInstrument) {
      setInstruments([...instruments, {
        instrument: selectedInstrument,
        level: e.target.value,
      }]);
    }
  };
  return (
    <form>
      <div>
        <label htmlFor="firstName">
          Prénom
          <input name="firstName" id="firstName" type="text" value={firstName} onChange={(e) => onChangeInput(setFirstName, e)} placeholder="Prénom" required />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          Nom
          <input name="lastName" id="lastName" type="text" value={lastName} onChange={(e) => onChangeInput(setLastName, e)} placeholder="Nom" required />
        </label>
      </div>
      <div>
        <label htmlFor="dateOfBirth">
          Date de naissance
          <input name="dateOfBirth" id="dateOfBirth" type="date" value={dateOfbirth} onChange={(e) => onChangeInput(setDateOfBirth, e)} required />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Adresse email
          <input name="email" id="email" type="email" value={email} onChange={(e) => onChangeInput(setEmail, e)} placeholder="Email" required />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Mot de passe
          <input name="password" id="password" type="password" value={password} onChange={(e) => onChangeInput(setPassword, e)} placeholder="Mot de passe" required />
        </label>
      </div>
      <div>
        <label htmlFor="description">
          Description
          <textarea name="description" id="description" type="text" value={description} onChange={(e) => onChangeInput(setDescription, e)} placeholder="Faire une courte description de vous" />
        </label>
      </div>
      <div>
        <label htmlFor="avatar">
          Image de profil
          <input name="avatar" id="avatar" type="file" placeholder="Choisir une photo" />
        </label>
      </div>
      <div>
        <select name="instrument" id="instrument" onChange={(e) => onChangeInput(setSelectedInstrument, e)} required>
          <option value="">Choisir un instrument</option>
          {
            instrumentsData.map(({ name, id }) => <option value={id} key={id}>{name}</option>)
          }
        </select>
        <select name="level" id="level" onChange={onSelectLevelSetInstruments}>
          <option value="">Choisir un niveau de pratique</option>
          {
            levelsData.map(({ name, id }) => <option value={id} key={id}>{name}</option>)
          }
        </select>
      </div>
    </form>
  );
};

export default Signup;
