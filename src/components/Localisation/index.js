import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Localisation.scss';

const Localisation = ({
  city, onChangeInput,
}) => {
  const [cities, setCities] = useState([]);
  const getCitiesFromAPI = () => {
    axios.get('https://geo.api.gouv.fr/communes?', {
      params: {
        nom: city,
        fields: 'departement,region,codesPostaux',
        codePostaux: [],
        limit: 5,
      },
    })
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {

      });
  };
  const onChangeCity = (e) => {
    setCities([]);
    onChangeInput('city', e.target.value);

    console.log(cities);
  };
  const getCityInfo = (e) => {
    console.log(e.target.innerHTML);
    const foundCity = cities.find((cityState) => (`${cityState.departement.code} - ${cityState.nom.toUpperCase()}`) === e.target.innerHTML);
    onChangeInput('city', foundCity.nom.toUpperCase());
    onChangeInput('code', foundCity.code);
    onChangeInput('departement', foundCity.departement);
    onChangeInput('region', foundCity.region);
    setCities([]);
  };

  return (
    <div className="signup__localisation">
      <div className="autocompletion-city">
        <label htmlFor="city">
          Ville
          <input name="city" id="city" type="text" onChange={onChangeCity} onKeyUp={getCitiesFromAPI} placeholder="ville" value={city} />
        </label>

        <ul className="autocompletion-city__ul">
          {
            cities.map((citySearch) => (
              <li className="autocompletion-city__ul__li" key={citySearch.code} onClick={getCityInfo}>{citySearch.departement.code} - {citySearch.nom.toUpperCase()}</li>
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
