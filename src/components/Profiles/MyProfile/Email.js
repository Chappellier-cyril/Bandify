import React from 'react';
import PropTypes from 'prop-types';

const Email = ({
  editEmail, handleSubmitEmail, emailInput, onChangeProfileInput, editFormToggle, email,
}) => (
  <>
    {editEmail ? (
      <form type="submit" onSubmit={handleSubmitEmail}>
        <div>
          <input
            name="email"
            type="text"
            value={emailInput.trim()}
            onChange={(e) => onChangeProfileInput('email', e.target.value)}
            placeholder="E-mail"
            required
          />
        </div>
        <button type="submit">Envoyer</button>
        <button
          type="button"
          onClick={() => editFormToggle('editEmail')}
        >
          <i className="fas fa-times-circle" />
        </button>
      </form>
    ) : (
      <h2>
        Email: {email}
        <span>
          <button
            type="button"
            onClick={() => editFormToggle('editEmail')}
          >
            <i className="fas fa-pen" />
          </button>
        </span>
      </h2>
    )}
  </>
);

Email.propTypes = {
  editEmail: PropTypes.bool.isRequired,
  handleSubmitEmail: PropTypes.func.isRequired,
  emailInput: PropTypes.string.isRequired,
  onChangeProfileInput: PropTypes.string.isRequired,
  editFormToggle: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default Email;
