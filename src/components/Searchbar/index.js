/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';
import './style.scss';

const Searchbar = ({
  onResetFilters, onSearchChange, onSearchSubmit, searchValue, onSelectChange,
  isFiltersOpen, toggleIsFiltersOpen, getInstruments, getLevels, getMusicStyles,
  instruments, levels, musicstyles, city, zipcode, departement, region,
}) => {
  useEffect(() => {
    getInstruments();
    getLevels();
    getMusicStyles();
  }, []);

  return (
    <div className="search">
      <form onSubmit={onSearchSubmit} method="GET" action="/search">
        {/* vide la recherche et réinitialise => nouvelle requete getMembers */}
        <button type="button" onClick={onResetFilters}>Réinitialiser</button>
        {/* barre de recherche */}
        <input
          type="search"
          name="searchBar"
          id="searchBar"
          className="search__search-input"
          placeholder="Rechercher un membre, une ville..."
          value={searchValue}
          onChange={(evt) => onSearchChange(evt.target.value)}
        />
        <button type="submit">Chercher</button>
        {/* SI isFiltersOpen === true, on affiche la div search__filters */}
        {isFiltersOpen && (
          <div className="search__filters">
            {/* select sur les instruments */}
            <select
              name="instruments"
              id="instruments"
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
          </div>
        )}
      </form>
      {/* ouvre les filtres */}
      <button type="button" onClick={toggleIsFiltersOpen}>Filtrer</button>
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
