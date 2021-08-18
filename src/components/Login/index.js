import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import usersData from 'src/data/users';

import './style.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onChangeInput = (setState, event) => {
    setState(event.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const foundUser = usersData.find((user) => user.password === password && user.mail === email);
    if (foundUser) {
      setIsLogged(true);
    }
  };

  return (
    <form onSubmit={onFormSubmit} method="post">
      <div>
        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => onChangeInput(setEmail, e)}
          placeholder="E-mail"
          required
        />
      </div>
      <div>
        <input
          name="password"
          type={passwordShown ? 'text' : 'password'}
          value={password}
          onChange={(e) => onChangeInput(setPassword, e)}
          placeholder="Mot de passe"
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
        >
          {passwordShown ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
        </button>
      </div>
      <button
        type="submit"
      >
        Envoyer
      </button>
    </form>
  );
};

export default Login;
