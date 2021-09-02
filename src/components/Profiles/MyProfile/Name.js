import React from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

const Name = ({
  editName, handleSubmitName, firstName, lastName, user, editFormToggle, onChangeProfileInput,
}) => (
  <>
    {editName ? (
      <form type="submit" onSubmit={handleSubmitName}>
        <div>
          <label htmlFor="firstName">
            Prénom
            <input name="firstName" id="firstName" type="text" value={DOMPurify.sanitize(firstName.trim(), { ALLOWED_TAGS: ['em', 'strong'] })} onChange={(e) => onChangeProfileInput('firstName', e.target.value)} placeholder="Prénom" required />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">
            Nom
            <input name="lastName" id="lastName" type="text" value={DOMPurify.sanitize(lastName.trim(), { ALLOWED_TAGS: ['em', 'strong'] })} onChange={(e) => onChangeProfileInput('lastName', e.target.value)} placeholder="Nom" required />
          </label>
        </div>
        <button type="submit">Envoyer</button>
        <button
          type="button"
          onClick={() => editFormToggle('editName')}
          className="myprofile__user--close-edit-name"
        >
          <i className="fas fa-times-circle" />
        </button>
      </form>
    ) : (
      <p className="myprofile__user--name">
        {user.firstname} {user.lastname}
        <span>
          <button
            type="button"
            onClick={() => editFormToggle('editName')}
            className="myprofile__user--edit-name"
          >
            <i className="fas fa-pen" />
          </button>
        </span>
      </p>
    )}
  </>
);

Name.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }),
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  editFormToggle: PropTypes.func.isRequired,
  editName: PropTypes.bool.isRequired,
  handleSubmitName: PropTypes.func.isRequired,
  onChangeProfileInput: PropTypes.func.isRequired,
};
Name.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
  },
};

export default Name;
