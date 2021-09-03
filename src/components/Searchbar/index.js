/* eslint-disable camelcase */
import React from 'react';
import PropTypes, { shape } from 'prop-types';
import DOMPurify from 'dompurify';
import Localisation from 'src/components/Localisation';
import './style.scss';

const Searchbar = ({
  onResetFilters, onSearchChange, onSearchSubmit, searchValue, onSelectChange,
  isFiltersOpen, toggleIsFiltersOpen,
  instruments, levels, musicstyles, city, code,
  departement, region, departments, regions,
}) => (
  <div className="search">
    <div className="search__header">
      <h1 className="search__header--title">Recherche</h1>
      {/* vide la recherche et réinitialise => nouvelle requete getMembers */}
    </div>

    <form onSubmit={onSearchSubmit} method="GET" action="/search" className="search__form">
      {/* barre de recherche */}
      <input
        type="search"
        name="searchBar"
        id="searchBar"
        className="search__form__search-input"
        placeholder="Rechercher un membre"
        value={DOMPurify.sanitize(searchValue.trim(), { ALLOWED_TAGS: ['em', 'strong'] })}
        onChange={(evt) => onSearchChange(evt.target.value)}
      />
      <i className="fas fa-search" />
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
            <option value="" key="instruments">Instrument</option>
            {
            instruments.map(({ instrument_name, id }) => (
              instrument_name && (
              <option
                value={instrument_name}
                key={instrument_name + id}
              >
                {instrument_name}
              </option>
              )
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
            <option value="" key="level">Niveau</option>
            {
            levels.map(({ level_name, id }) => (
              level_name && (
                <option
                  value={level_name}
                  key={level_name + id}
                >
                  {level_name}
                </option>
              )

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
            <option value="" key="styles">Styles musicaux</option>
            {
            musicstyles && musicstyles.map(({ music_name, id }) => (
              music_name && (
                <option
                  value={music_name}
                  key={music_name + id}
                >
                  {music_name}
                </option>
              )
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
            <option value="" key="dpt">Département</option>
            {
            departments.map(({ department_name }) => (
              department_name && (
                <option
                  value={department_name}
                  key={department_name}
                >
                  {department_name}
                </option>
              )
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
            <option value="" key="region">Région</option>
            {
            regions.map(({ region_name }) => (
              region_name && (
                <option
                  value={region_name}
                  key={region_name}
                >
                  {region_name}
                </option>
              )
            ))
          }
          </select>
        </div>
      )}
      <div className="search__button__container">
        {/* ouvre/ferme les filtres */}
        <button type="button" onClick={toggleIsFiltersOpen} className="search__button">
          {isFiltersOpen ? 'Masquer' : 'Filtres'}
        </button>
        <button type="button" onClick={onResetFilters} className="search__button">Réinitialiser</button>
        {/* Appelle onSearchSubmit */}
      </div>
      <div className="search__launch">
        <button type="submit" className="search__button--launch">Lancer</button>
      </div>
    </form>
  </div>
);

Searchbar.defaultProps = {
  instruments: [{ instrument_name: '' }],
  levels: [{ level_name: '' }],
  musicstyles: [{ music_name: '' }],
  city: '',
  code: '',
  departement: '',
  region: '',
  departments: [{ department_name: '' }],
  regions: [{ region_name: '' }],
};
Searchbar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  isFiltersOpen: PropTypes.bool.isRequired,
  toggleIsFiltersOpen: PropTypes.func.isRequired,
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
  city: PropTypes.string,
  code: PropTypes.string,
  departement: PropTypes.string,
  region: PropTypes.string,
  departments: PropTypes.arrayOf(PropTypes.shape({
    department_name: PropTypes.string,
  })),
  regions: PropTypes.arrayOf(PropTypes.shape({
    region_name: PropTypes.string,
  })),
};

export default Searchbar;
