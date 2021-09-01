import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Password = ({
  editPassword, handleSubmitPassword, passwordShown, password, myId,
  togglePasswordVisibility, editFormToggle, onChangeProfileInput,
}) => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorPasswordCheck, setErrorPasswordCheck] = useState('');
  const [isPasswordVerify, setIsPasswordVerify] = useState();
  const options = {
    method: 'POST',
    url: `${process.env.BANDIFY_API_URL}/checkpassword/${myId}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      // on vient chercher dans le state ce qui nous intéresse
      user_password: password,
    },
  };
  const getPasswordVerification = (e) => {
    e.preventDefault();
    axios(options).then((response) => {
      console.log(response);
      if (response.data.error) {
        setIsPasswordVerify(false);
        console.log(response.data.error);
        setErrorPassword(response.data.error);
      }
      if (response.data.message) return setIsPasswordVerify(true);
      return null;
    }).catch(() => setIsPasswordVerify(false)).then(() => onChangeProfileInput('user_password', ''));
  };
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
  return (
    <>
      {editPassword ? (
        <form type="submit" onSubmit={handleSubmitPassword} className="edit__password__form">
          {!isPasswordVerify && (
            <>
              <div className="login__form__container">
                <label htmlFor="password">
                  <input
                    className="login__form__container--input"
                    name="password"
                    id="password"
                    type={passwordShown ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => onChangeProfileInput('user_password', e.target.value)}
                    placeholder="Verification votre mot de passe actuel*"
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
                </label>
              </div>
              <button type="submit" onClick={(e) => getPasswordVerification(e)} className="edit__password__form__button">Vérifier</button>
              {errorPassword && <p className="signup-submit__error">{errorPassword}</p>}
              <button
                type="button"
                onClick={() => editFormToggle('editPassword')}
              >
                <i className="fas fa-times-circle" />
              </button>
            </>
          )}
          {isPasswordVerify && (
          <>
            <div className="login__form__container">
              <label htmlFor="password">
                <input
                  className="login__form__container--input"
                  name="password"
                  id="password"
                  type={passwordShown ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => onChangeProfileInput('user_password', e.target.value)}
                  placeholder="Nouveau mot de passe*"
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
              </label>
            </div>
            {errorPassword && <p className="signup-submit__error">{errorPassword}</p>}
            <div className="login__form__container">
              <label htmlFor="password-confirm">
                <input
                  className="login__form__container--input"
                  name="password-confirm"
                  id="password-confirm"
                  type={passwordShown ? 'text' : 'password'}
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  placeholder="Confirmez le mot de passe*"
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
              </label>
            </div>
            {errorPasswordCheck && <p className="signup-submit__error">{errorPasswordCheck}</p>}
            <button
              type="submit"
              className="edit__password__form__button"
              onClick={(e) => {
                handleSubmitPassword(e);
                setIsPasswordVerify(false);
              }}
              disabled={!isPasswordVerify || !password || !passwordCheck
              || errorPassword || errorPasswordCheck}
            >Envoyer
            </button>
            <button
              type="button"
              onClick={() => {
                editFormToggle('editPassword');
                setIsPasswordVerify(false);
              }}
            >
              <i className="fas fa-times-circle" />
            </button>
          </>
          )}
        </form>
      ) : (
        <h2>
          <span>
            <button
              type="button"
              onClick={() => editFormToggle('editPassword')}
              className="edit__password--btn"
            >
              Modifier mon mot de passe
            </button>
          </span>
        </h2>
      )}
    </>
  );
};
Password.propTypes = {
  myId: PropTypes.number.isRequired,
  editPassword: PropTypes.bool.isRequired,
  handleSubmitPassword: PropTypes.func.isRequired,
  passwordShown: PropTypes.bool.isRequired,
  password: PropTypes.string,
  togglePasswordVisibility: PropTypes.func.isRequired,
  editFormToggle: PropTypes.func.isRequired,
  onChangeProfileInput: PropTypes.func.isRequired,
};

Password.defaultProps = {
  password: '',
};

export default Password;
