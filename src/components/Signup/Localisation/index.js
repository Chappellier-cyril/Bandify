import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Localisation.scss';

const Localisation = ({
  city, zipcode, onChangeInput,
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
        console.log('responsedata', response.data);
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
    const foundCity = cities.find((cityState) => cityState.nom === e.target.innerHTML);
    onChangeInput('city', foundCity.nom);
    onChangeInput('zipcode', foundCity.codesPostaux[0]);
    onChangeInput('departement', foundCity.departement);
    onChangeInput('region', foundCity.region);
    setCities([]);
  };

  return (
    <div className="signup__localisation">
      <div className="autocompletion-city">
        <input type="text" onChange={onChangeCity} onKeyUp={getCitiesFromAPI} placeholder="ville" value={city} autoComplete="off" />
        <ul className="autocompletion-city__ul">
          {
                  cities.map((citySearch) => (
                    <li className="autocompletion-city__ul__li" key={citySearch.code} onClick={getCityInfo}>{citySearch.nom}</li>
                  ))
                }
        </ul>
      </div>
      <input type="text" onChange={(e) => onChangeInput('zipcode', e.target.value)} placeholder="zipcode" value={zipcode} disabled />
    </div>
  );
};

Localisation.propTypes = {
  city: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};

export default Localisation;
