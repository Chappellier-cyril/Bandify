import React from 'react';
import PropTypes from 'prop-types';
import { getAge } from 'src/selectors/user';

const Birthdate = ({
  editBirthdate,
  handleSubmitBirthdate, dateOfBirth, editFormToggle, user, onChangeProfileInput,
}) => (
  <>
    {editBirthdate ? (
      <form type="submit" onSubmit={handleSubmitBirthdate}>
        <div>
          <label htmlFor="dateOfBirth">
            Date de naissance
            <input name="dateOfBirth" id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => onChangeProfileInput('dateOfBirth', e.target.value)} required />
          </label>
        </div>
        <button type="submit">Envoyer</button>
        <button
          type="button"
          onClick={() => editFormToggle('editBirthdate')}
        >
          <i className="fas fa-times-circle" />
        </button>
      </form>
    ) : (
      <h2>
        {getAge(user.birthdate)} ans
        <span>
          <button
            type="button"
            onClick={() => editFormToggle('editBirthdate')}
          >
            <i className="fas fa-pen" />
          </button>
        </span>
      </h2>
    )}
  </>
);

Birthdate.propTypes = {

  editBirthdate: PropTypes.bool.isRequired,
  handleSubmitBirthdate: PropTypes.func.isRequired,
  dateOfBirth: PropTypes.string.isRequired,
  editFormToggle: PropTypes.func.isRequired,
  user: PropTypes.shape({
    birthdate: PropTypes.string,
  }),
  onChangeProfileInput: PropTypes.func.isRequired,
};

Birthdate.defaultProps = {

  user: {
    birthdate: '',
  },
};

export default Birthdate;
