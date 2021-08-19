import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './style.scss';

const Login = ({
  email,
  password,
  isLogged,
  isError,
  passwordShown,
  onChangeInput,
  handleSubmit,
  togglePasswordVisibility,
}) => {
  // Fonction qui se déclenche au clique sur l'oeil
  // et qui permet de modifier la visibilité du mot de passe
  // const togglePasswordVisibility = () => {
  //   setPasswordShown(!passwordShown);
  // };

  // Fonction qui se déclenche au submit du formulaire
  // Si l'utilisateur est trouvé isLogged passe à true dans le state
  // Sinon isError passe à true et isLogged reste à false
  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
    // const foundUser = usersData.find(
    // (user) => user.password === password && user.mail === email);
    // if (foundUser) {
    //   setIsLogged(true);
    // }
    // if (!foundUser) {
    //   setIsError(true);
    // }
  };

  return (
    <>
      {/* Si l'utilisateur est connecté on redirige vers la page d'accueil */}
      {isLogged && <Redirect to="/" />}
      {/* Si la connexion échoue on affiche un message */}
      {isError && <p>E-mail ou Mot de passe incorrect</p>}
      <form onSubmit={onFormSubmit} method="post" className="login__form">
        <div>
          <input
            name="email"
            type="text"
            value={email}
            onChange={(e) => onChangeInput('email', e.target.value)}
            placeholder="E-mail"
            required
          />
        </div>
        <div>
          <input
            name="password"
            // Si l'oeil est cliqué on affiche le mot de passe sinon on laisse en type password
            type={passwordShown ? 'text' : 'password'}
            value={password}
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
          type="submit"
        >
          Envoyer
        </button>
      </form>
    </>
  );
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  passwordShown: PropTypes.bool.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
};

export default Login;
