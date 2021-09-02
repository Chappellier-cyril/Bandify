import React from 'react';
import PropTypes from 'prop-types';
import Localisation from 'src/components/Localisation';
import { firstLetterToUpper, restToLower } from 'src/selectors/city';

const City = ({
  editCity, handleSubmitCity, onCityChange, city, editFormToggle, user,
}) => (
  <>
    {editCity ? (
      <form type="submit" onSubmit={handleSubmitCity}>
        <Localisation
          city={city}
          onChangeInput={onCityChange}
        />
        <div className="myprofile__user--submit-container">
          <button className="myprofile__user--edit-submit-btn" type="submit">Envoyer</button>
          <button
            type="button"
            onClick={() => editFormToggle('editCity')}
            className="myprofile__user--close-edit-btn"
          >
            <i className="fas fa-times-circle" />
          </button>
        </div>
      </form>
    ) : (
      <p className="myprofile__user--name">Ville:
        {user.city && (
        <span>
          {firstLetterToUpper(restToLower(user.city.city_name))} ({user.city.department_code})
        </span>
        )}
        <span>
          <button
            type="button"
            onClick={() => editFormToggle('editCity')}
            className="myprofile__user--edit-city"
          >
            <i className="fas fa-pen" />
          </button>
        </span>
      </p>
    )}
  </>
);

City.propTypes = {
  user: PropTypes.shape({
    city: PropTypes.shape({
      city_name: PropTypes.string,
      department_code: PropTypes.string,
    }),
  }),
  editCity: PropTypes.bool.isRequired,
  handleSubmitCity: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  editFormToggle: PropTypes.func.isRequired,
};
City.defaultProps = {
  user: {
    city: {
      city_name: '',
      city_department_code: '',
    },
  },
};

export default City;
