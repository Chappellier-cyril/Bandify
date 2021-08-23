import { connect } from 'react-redux';
import Searchbar from 'src/components/Searchbar';

const mapStateToProps = (state) => ({
  searchValue: state.settings.searchValue,
  instruments: state.settings.instruments,
  levels: state.settings.levels,
  musicstyles: state.settings.musicstyles,
  isFiltersOpen: state.settings.isFiltersOpen,
  // TODO
  // city: state.signup.city,
  // zipcode: state.signup.zipcode,
  // departement: state.signup.departement,
  // region: state.signup.region,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (value) => {
    dispatch({ type: 'SET_SEARCH_INPUT_VALUE', searchValue: value });
  },
  onSearchSubmit: (evt) => {
    evt.preventDefault();
    dispatch({ type: 'ON_SEARCH_SUBMIT' });
  },
  onSelectChange: (key, value) => {
    dispatch({ type: 'SET_SELECT_INPUT_VALUE', key, value });
  },
  toggleIsFiltersOpen: () => {
    dispatch({ type: 'SET_IS_FILTERS_OPEN' });
  },
  getInstruments: () => {
    dispatch({ type: 'GET_INSTRUMENTS' });
  },
  getLevels: () => {
    dispatch({ type: 'GET_LEVELS' });
  },
  getMusicStyles: () => {
    dispatch({ type: 'GET_MUSIC_STYLES' });
  },
  onResetFilters: () => {
    dispatch({ type: 'ON_RESET_FILTERS' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
