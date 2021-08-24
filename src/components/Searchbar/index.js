/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';

import Localisation from 'src/components/Localisation';
import './style.scss';

const Searchbar = ({
  onResetFilters, onSearchChange, onSearchSubmit, searchValue, onSelectChange,
  isFiltersOpen, toggleIsFiltersOpen,
  getInstruments, getLevels, getMusicStyles, getDepartments, getRegions,
  instruments, levels, musicstyles, city, code,
  departement, region, departments, regions,
}) => {
  useEffect(() => {
    getInstruments();
    getLevels();
    getMusicStyles();
    getDepartments();
    getRegions();
  }, []);

  return (
    <div className="search">
      <div className="search__header">
        <h1>Recherche</h1>
        {/* vide la recherche et réinitialise => nouvelle requete getMembers */}
        <button type="button" onClick={onResetFilters} className="search__button">Réinitialiser</button>
      </div>

      <form onSubmit={onSearchSubmit} method="GET" action="/search" className="search__form">
        {/* barre de recherche */}
        <input
          type="search"
          name="searchBar"
          id="searchBar"
          className="search__form__search-input"
          placeholder="Rechercher un membre, une ville..."
          value={searchValue}
          onChange={(evt) => onSearchChange(evt.target.value)}
        />

        {/* SI isFiltersOpen === true, on affiche la div search__form-filters */}
        {isFiltersOpen && (
          <div className="search__form-filters">
            {/* select sur les instruments */}
            <select
              name="instruments"
              id="instruments"
              className="search__form-filters__select"
              onChange={(evt) => onSelectChange('instrument', evt.target.value)}
            >
              <option value="">Instrument</option>
              {
              instruments.map(({ instrument_name, id }) => (
                <option
                  value={instrument_name}
                  key={id}
                >
                  {instrument_name}
                </option>
              ))
            }
            </select>
            {/* select sur les levels */}
            <select
              name="levels"
              id="levels"
              className="search__form-filters__select"
              onChange={(evt) => onSelectChange('level', evt.target.value)}
            >
              <option value="">Niveau</option>
              {
              levels.map(({ level_name, id }) => (
                <option
                  value={level_name}
                  key={id}
                >
                  {level_name}
                </option>
              ))
            }
            </select>
            {/* select sur les styles de musiques */}
            <select
              name="musicstyles"
              id="musicstyles"
              className="search__form-filters__select"
              onChange={(evt) => onSelectChange('musicstyle', evt.target.value)}
            >
              <option value="">Styles musicaux</option>
              {
              musicstyles.map(({ music_name, id }) => (
                <option
                  value={music_name}
                  key={id}
                >
                  {music_name}
                </option>
              ))
            }
            </select>

            {/* Input pour rentrer une ville */}
            <Localisation
              city={city}
              zipcode={code}
              departement={departement}
              region={region}
              onChangeInput={onSelectChange}
            />

            {/* select sur les départements */}
            <select
              name="departments"
              id="departments"
              className="search__form-filters__select"
              onChange={(evt) => onSelectChange('department', evt.target.value)}
            >
              <option value="">Département</option>
              {
              departments.map(({ department_name }) => (
                <option
                  value={department_name}
                  key={department_name}
                >
                  {department_name}
                </option>
              ))
            }
            </select>

            {/* select sur les régions */}
            <select
              name="regions"
              id="regions"
              className="search__form-filters__select"
              onChange={(evt) => onSelectChange('region', evt.target.value)}
            >
              <option value="">Région</option>
              {
              regions.map(({ region_name }) => (
                <option
                  value={region_name}
                  key={region_name}
                >
                  {region_name}
                </option>
              ))
            }
            </select>
          </div>
        )}
        {/* ouvre/ferme les filtres */}
        <button type="button" onClick={toggleIsFiltersOpen} className="search__button">
          {isFiltersOpen ? 'Reduire' : 'Filtrer'}
        </button>
        {/* Appelle onSearchSubmit */}
        <button type="submit" className="search__button--launch">Lancer</button>
      </form>
    </div>
  );
};
Searchbar.defaultProps = {
  instruments: [{ instrument_name: '' }],
  levels: [{ level_name: '' }],
  musicstyles: [{ music_name: '' }],
};
Searchbar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  isFiltersOpen: PropTypes.bool.isRequired,
  toggleIsFiltersOpen: PropTypes.func.isRequired,
  getInstruments: PropTypes.func.isRequired,
  getLevels: PropTypes.func.isRequired,
  getMusicStyles: PropTypes.func.isRequired,
  instruments: PropTypes.arrayOf(shape({
    instrument_name: PropTypes.string,
  })),
  levels: PropTypes.arrayOf(shape({
    level_name: PropTypes.string,
  })),
  musicstyles: PropTypes.arrayOf(shape({
    music_name: PropTypes.string,
  })),
  onResetFilters: PropTypes.func.isRequired,
};

export default Searchbar;
