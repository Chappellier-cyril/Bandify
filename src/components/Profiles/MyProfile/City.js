import React from 'react';
import PropTypes from 'prop-types';
import Localisation from 'src/components/Localisation';

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
        <button type="submit">Envoyer</button>
        <button
          type="button"
          onClick={() => editFormToggle('editCity')}
        >
          <i className="fas fa-times-circle" />
        </button>
      </form>
    ) : (
      <h2>Ville:
        {user.city && (
        <span>
          {user.city.city_name} ({user.city.department_code})
        </span>
        )}
        <span>
          <button
            type="button"
            onClick={() => editFormToggle('editCity')}
          >
            <i className="fas fa-pen" />
          </button>
        </span>
      </h2>
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
