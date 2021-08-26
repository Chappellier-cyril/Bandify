import React from 'react';
import PropTypes from 'prop-types';

const Description = ({
  editDescription, handleSubmitDescription, editFormToggle, user, description, onChangeProfileInput,
}) => (
  <>
    {editDescription ? (
      <form type="submit" onSubmit={handleSubmitDescription}>
        <div>
          <label htmlFor="description">
            Description
            <textarea name="description" id="description" type="text" value={description} onChange={(e) => onChangeProfileInput('user_description', e.target.value)} placeholder="Faire une courte description de vous" />
          </label>
        </div>
        <button type="submit">Envoyer</button>
        <button
          type="button"
          onClick={() => editFormToggle('editDescription')}
        >
          <i className="fas fa-times-circle" />
        </button>
      </form>
    ) : (
      <h2>
        Description
        <span>
          <button
            type="button"
            onClick={() => editFormToggle('editDescription')}
          >
            <i className="fas fa-pen" />
          </button>
        </span>
        <p>{user.user_description}</p>
      </h2>
    )}
  </>
);

Description.propTypes = {
  editFormToggle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  editDescription: PropTypes.bool.isRequired,
  handleSubmitDescription: PropTypes.func.isRequired,
  onChangeProfileInput: PropTypes.func.isRequired,
  user: PropTypes.arrayOf(PropTypes.shape({
    user_password: PropTypes.string,
  })),
};
Description.defaultProps = {
  user: {
    user_password: '',
  },
};

export default Description;
