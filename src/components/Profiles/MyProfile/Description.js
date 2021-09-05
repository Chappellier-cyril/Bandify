import React from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

const Description = ({
  editDescription, handleSubmitDescription, editFormToggle, user,
  description, onChangeProfileInput, isEditing,
}) => (
  <>
    {isEditing && editDescription ? (
      <form type="submit" onSubmit={handleSubmitDescription}>
        <div className="myprofile__textarea--container">
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              id="description"
              type="text"
              value={DOMPurify.sanitize(description.trim(), { ALLOWED_TAGS: ['em', 'strong'] })}
              className="myprofile__desc--textarea"
              onChange={(e) => onChangeProfileInput('user_description', e.target.value)}
              placeholder="Faire une courte description de vous"
            />
          </label>
        </div>
        <div className="myprofile__user--submit-container">
          <button type="submit" className="myprofile__user--edit-submit-btn">Envoyer</button>
          <button
            type="button"
            onClick={() => editFormToggle('editDescription')}
            className="myprofile__user--close-edit-btn"
          >
            <i className="fas fa-times-circle" />
          </button>
        </div>
      </form>
    ) : (
      <div className="myprofile__user--description">
        Description :
        {
          isEditing && (
            <span>
              <button
                type="button"
                onClick={() => editFormToggle('editDescription')}
                className="myprofile__user--edit-description"
              >
                <i className="fas fa-pen" />
              </button>
            </span>
          )
        }
        <p className="myprofile__user--description-details">{user.user_description}</p>
      </div>
    )}
  </>
);

Description.propTypes = {
  editFormToggle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  editDescription: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleSubmitDescription: PropTypes.func.isRequired,
  onChangeProfileInput: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user_description: PropTypes.string,
  }),
};
Description.defaultProps = {
  user: {
    user_description: '',
  },
};

export default Description;
