import React from 'react';
import DOMPurify from 'dompurify';
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
            value={DOMPurify.sanitize(emailInput.trim(), { ALLOWED_TAGS: ['em', 'strong'] })}
            onChange={(e) => onChangeProfileInput('email', e.target.value)}
            placeholder="E-mail"
            required
          />
        </div>
        <button type="submit">Envoyer</button>
        <button
          type="button"
          onClick={() => editFormToggle('editEmail')}
          className="myprofile__user--close-edit-email"
        >
          <i className="fas fa-times-circle" />
        </button>
      </form>
    ) : (
      <div className="myprofile__user--email">
        Email: {email}
        <span>
          <button
            type="button"
            onClick={() => editFormToggle('editEmail')}
            className="myprofile__user--edit-email"
          >
            <i className="fas fa-pen" />
          </button>
        </span>
      </div>
    )}
  </>
);

Email.propTypes = {
  editEmail: PropTypes.bool.isRequired,
  handleSubmitEmail: PropTypes.func.isRequired,
  emailInput: PropTypes.string.isRequired,
  onChangeProfileInput: PropTypes.func.isRequired,
  editFormToggle: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default Email;
