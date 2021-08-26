import React from 'react';
import PropTypes from 'prop-types';

const Password = ({
  editPassword, handleSubmitPassword, passwordShown, password,
  togglePasswordVisibility, editFormToggle, onChangeProfileInput,
}) => (
  <>
    {editPassword ? (
      <form type="submit" onSubmit={handleSubmitPassword}>
        <div>
          <input
            name="password"
                    // Si oeil cliqué on affiche le mot de passe sinon on laisse en type password
            type={passwordShown ? 'text' : 'password'}
            value={password.trim()}
            onChange={(e) => onChangeProfileInput('user_password', e.target.value)}
            placeholder="Nouveau mot de passe"
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
        <button type="submit">Envoyer</button>
        <button
          type="button"
          onClick={() => editFormToggle('editPassword')}
        >
          <i className="fas fa-times-circle" />
        </button>
      </form>
    ) : (
      <h2>
        <span>
          <button
            type="button"
            onClick={() => editFormToggle('editPassword')}
          >
            Modifier mon mot de passe
          </button>
        </span>
      </h2>
    )}
  </>
);

Password.propTypes = {
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
