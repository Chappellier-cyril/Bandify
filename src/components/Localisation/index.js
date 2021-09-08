import React, { useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import './Localisation.scss';

const Localisation = ({
  city, onChangeInput,
}) => {
  const [cities, setCities] = useState([]);
  const getCitiesFromAPI = () => {
    axios.get(`${process.env.BANDIFY_API_URL}/autocomplete/${city}`)
      .then((response) => {
        setCities(response.data);
      });
  };
  const onChangeCity = (e) => {
    setCities([]);
    onChangeInput('city', e.target.value);
  };
  const getCityInfo = (e) => {
    const foundCity = cities.find((cityState) => (`${cityState.department_code} - ${cityState.city_name.toUpperCase()}`) === e.target.innerHTML);
    onChangeInput('city', foundCity.city_name.toUpperCase());
    onChangeInput('code', foundCity.code);
    onChangeInput('departement', foundCity.departement);
    onChangeInput('region', foundCity.department.region);
    setCities([]);
  };

  return (
    <div className="signup__localisation">
      <div className="autocompletion-city">
        <input
          name="city"
          id="city"
          type="text"
          onChange={onChangeCity}
          onKeyUp={getCitiesFromAPI}
          placeholder="Ville"
          value={DOMPurify.sanitize(city.trim(), { ALLOWED_TAGS: ['em', 'strong'] })}
          className="search__form-filters__select autocompletion-city__input"
        />
        <ul className="autocompletion-city__ul">
          {
            cities && cities.map((citySearch) => (
              <li className="autocompletion-city__ul__li" key={citySearch.code} onClick={getCityInfo}>{citySearch.department_code} - {citySearch.city_name.toUpperCase()}</li>
            ))
          }
        </ul>
      </div>

    </div>
  );
};

Localisation.propTypes = {
  city: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};

export default Localisation;
