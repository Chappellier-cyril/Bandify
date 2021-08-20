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

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
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
            value={email.trim()}
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
