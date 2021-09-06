/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Instruments = ({
  editInstruments, deleteInstrumentAssociation, handleSubmitInstruments,
  instrumentsData, levelsData, instruments,
  editFormToggle, isEditing,
}) => {
  const [newPlay, setNewPlay] = useState({ instrument_id: 0, level_id: 0 });
  const [filteredInst, setFilteredInst] = useState();
  /* On filtre pour ne proposer que les instruments disponibles que
  l'utilisateur n'a pas déjà dans sa collection */
  useEffect(() => {
    setFilteredInst(
      instrumentsData.filter((i) => {
        const instFoundOnPlay = instruments.find((play) => play.instrument_id === i.id);
        if (instFoundOnPlay) {
          return false;
        }
        return true;
      }),
    );
  }, [instruments]);
  return (
    <>
      {isEditing && editInstruments ? (
        <>
          <div className="myprofile__instrument">
            <p className="myprofile__instrument--description">Mes instruments:</p>
            {instruments.length <= 1 && <p className="signup-submit__error">Vous devez garder au moins un instrument</p>}
            {instruments.length > 3 && <p className="signup-submit__error">Vous avez atteint le nombre maximum d'instrument</p>}
            <ul className="myprofile__instrument--list">
              {instruments && instruments.map((play) => (
                play.id && (
                <li className="myprofile__instrument__tag" key={play.id}>
                  <span className="myprofile__instrument__tag--name">{play.instrument.instrument_name}</span>
                  {play.level && <span className="myprofile__instrument__tag--level">{play.level.level_name}</span>}
                  <button className="delete--association" type="button" onClick={() => deleteInstrumentAssociation(play)} disabled={instruments.length <= 1}>
                    <i className="fas fa-times-circle delete--association" />
                  </button>
                </li>
                )
              ))}
            </ul>
          </div>
          {instruments.length < 4 && (
            <div className="signup-submit__group--instruments">
              <label htmlFor="instrument" className="signup-submit__group--instruments__input-container">
                <select className="signup-submit__group__select" name="instrument" id="instrument" onChange={(e) => setNewPlay({ ...newPlay, instrument_id: e.target.value })} required>
                  <option value="">Choisir un instrument</option>
                  {
                    instrumentsData && filteredInst.map(({ instrument_name, id }) => (
                      <option value={id} key={`${instrument_name} + ${id}`}>{instrument_name}</option>))
                  }
                </select>
                <select className="signup-submit__group__select" name="level" id="level" onChange={(e) => setNewPlay({ ...newPlay, level_id: e.target.value })} disabled={!newPlay.instrument_id}>
                  <option value="">Choisir un niveau de pratique</option>
                  {
                    levelsData && levelsData.map(({ level_name, id }) => (
                      <option value={id} key={level_name + id}>{level_name}</option>))
                  }
                </select>
              </label>
            </div>
          )}
          <div className="myprofile__user--submit-container">
            <button
              type="submit"
              className="myprofile__user--edit-submit-btn"
              onClick={(e) => {
                handleSubmitInstruments(e, newPlay);
                setNewPlay({ instrument_id: 0, level_id: 0 });
              }}
              disabled={!newPlay.instrument_id}
            >Ajouter un Instrument
            </button>
            <button
              type="button"
              className="myprofile__user--close-edit-btn"
              onClick={() => editFormToggle('editInstruments')}
            >
              <i className="fas fa-times-circle" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="myprofile__instrument">
            <p className="myprofile__instrument--description">Mes instruments :
              {
                isEditing && (
                  <span>
                    <button
                      type="button"
                      onClick={() => editFormToggle('editInstruments')}
                      className="myprofile__user--edit-instruments"
                    >
                      <i className="fas fa-pen" />
                    </button>
                  </span>
                )
              }
            </p>
            <ul className="myprofile__instrument--list">
              {instruments && instruments.map((play) => (
                play.id && (
                <li className="myprofile__instrument__tag" key={play.id}>
                  <span className="myprofile__instrument__tag--name">{play.instrument.instrument_name}</span>
                  {play.level && <span className="myprofile__instrument__tag--level">{play.level && play.level.level_name}</span>}
                </li>
                )
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};
Instruments.propTypes = {
  editInstruments: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  deleteInstrumentAssociation: PropTypes.func.isRequired,
  handleSubmitInstruments: PropTypes.func.isRequired,
  instrumentsData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  levelsData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  instruments: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  editFormToggle: PropTypes.func.isRequired,
};

Instruments.defaultProps = {
  instruments: [{
    instrument: {
      instrument_name: '',
    },
  }],
};

export default Instruments;
