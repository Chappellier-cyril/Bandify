import React, { useState } from 'react';

import instrumentsData from 'src/data/instruments';
import levelsData from 'src/data/levels';

/*
Avec Redux :
 Prévoir les appels à la BDD pour vérifiez si l'email existe déjà
 Vérifiez si l'utilisateur à plus de 15 ans
 Voir la solution la plus adapté pour l'envoi de la photo en BDD ( multer ou file-loader )

*/

const Signup = () => {
  // création des champs contrôlés pour les inputs du formulaire d'inscription grâce aux useState
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfbirth, setDateOfBirth] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // le state instrument sera un tableau qui récupère l'instrument et le niveau dans un objet
  const [instruments, setInstruments] = useState([{}]);

  /* fonction générique pour changer les inputs afin d'avoir des composants contrôlées
    @params setState => fonction du useState de l'input contrôlé
    @params event => récupère la valeur de l'input
  */
  const onChangeInput = (setState, event) => {
    setState(event.target.value);
  };
  // fonction pour copié l'instrument séléctionné
  const onSelectInput = (e, index, key) => {
    const copyInstrument = [...instruments];
    copyInstrument[index] = {
      ...copyInstrument[index],
      [key]: e.target.value,
    };
    setInstruments(copyInstrument);
    console.log(copyInstrument);
  };

  const addNewInputInstrument = () => {
    setInstruments([...instruments, {}]);
  };
  const removeInputInstrument = (index) => {
    const copyInstruments = instruments.filter((_, i) => i !== index);
    setInstruments(copyInstruments);
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

      {
        // on boucle sur le tableau d'instruments
        instruments.map((instrument, index) => (
          // Prévoir de générer un id pour un code plus propre
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <select name={`instrument${index}`} id={`instrument${index}`} onChange={(e) => onSelectInput(e, index, 'instrument')} required>
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
              index < 3
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
          TODO => select music style et ville code postal => voir pour de l'autocomplétion
          avec appel API code postaux la poste ou API / Gouv
        */
      }
    </form>
  );
};

export default Signup;
