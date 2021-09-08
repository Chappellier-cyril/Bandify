import React from 'react';
import DOMPurify from 'dompurify';
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

      <form onSubmit={onFormSubmit} method="post" className="login__form">
        <h1 className="login__form-title">Connexion</h1>
        {/* Si la connexion échoue on affiche un message */}
        {isError && <p className="login__form__error">E-mail ou Mot de passe incorrect</p>}
        <div className="login__form__container">
          <input
            className="login__form__container--input"
            name="email"
            type="text"
            value={DOMPurify.sanitize(email.trim(), { ALLOWED_TAGS: ['em', 'strong'] })}
            onChange={(e) => onChangeInput('email', e.target.value)}
            placeholder="E-mail"
            required
          />
        </div>
        <div className="login__form__container">
          <input
            className="login__form__container--input"
            name="password"
            // Si l'oeil est cliqué on affiche le mot de passe sinon on laisse en type password
            type={passwordShown ? 'text' : 'password'}
            value={DOMPurify.sanitize(password.trim(), { ALLOWED_TAGS: ['em', 'strong'] })}
            onChange={(e) => onChangeInput('password', e.target.value)}
            placeholder="Mot de passe"
            required
          />
          <button
            className="login__form__container--eye"
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
          className="login__form--submit"
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
