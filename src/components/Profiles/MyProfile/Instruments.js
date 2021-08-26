/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Instruments = ({
  editInstruments, plays, deleteInstrumentAssociation, handleSubmitInstruments,
  instrumentsData, levelsData, instruments, addNewInstrument, removeInstrument,
  onSelectInput, editFormToggle,
}) => {
  // On récupère un tableau filtré sans les instrument que l'utilisateur à déjà choisi
  const [filtredInstruments, setFilteredInstruments] = useState(instrumentsData);
  useEffect(() => {
    if (!plays[0].instrument) return false;
    const filtredInst = instrumentsData.filter((inst) => {
      const foundPlay = plays.find((p) => p.instrument_id === inst.id);
      if (foundPlay) return !foundPlay;
      const foundInst = instruments.find((instrument) => instrument.instrument === inst.id);
      if (foundInst) return !foundInst;
      return inst;
    });
    return setFilteredInstruments(filtredInst);
  }, [instruments, plays]);

  return (
    <>
      {editInstruments ? (
        <>
          <div className="home__instrument">
            <p className="home__instrument--description">Mes instruments:</p>
            <ul className="home__instrument--list">
              {plays.map((play) => (
                play.id && (
                <li className="home__instrument__tag" key={play.id}>
                  <span className="home__instrument__tag--name">{play.instrument.instrument_name}</span>
                  <span className="home__instrument__tag--level">{play.level && play.level.level_name}</span>
                  <span className="home__instrument__tag--delete-btn" onClick={deleteInstrumentAssociation}><i className="fas fa-times-circle" /></span>
                </li>
                )
              ))}
            </ul>
          </div>
          <form type="submit" onSubmit={handleSubmitInstruments}>
            <div className="signup-submit__group">
              <span className="signup-submit__group__label">Choississez au moins un instrument et un niveau de pratique (optionel)</span>
              {plays.map((play, index) => (
              // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="signup-submit__group--instruments">
                  <label htmlFor={`instrument${index}`} className="signup-submit__group--instruments__input-container">
                    <select className="signup-submit__group__select" name={`instrument${index}`} id={`instrument${index}`} onChange={(e) => onSelectInput(e, index, 'instrument')} required={index === 0}>
                      <option value="">Changez {play.instrument.instrument_name}</option>
                      {filtredInstruments.map(({ instrument_name, id }) => (
                        <option value={id} key={id}>{instrument_name}</option>))}
                    </select>
                    <select className="signup-submit__group__select" name={`level${index}`} id={`level${index}`} onChange={(e) => onSelectInput(e, index, 'level')}>
                      <option value="">Choisir un niveau de pratique</option>
                      {levelsData.map(({ level_name, id }) => (
                        <option value={id} key={id}>{level_name}</option>))}
                    </select>
                  </label>
                  <div className="signup-submit__group--instruments__button-container">
                    {index < 3 // maximum de ligne d'instrument
                    && (index === instruments.length - 1
                      ? (
                        <button
                          className="signup-submit__group--instruments__button"
                          type="button"
                          onClick={addNewInstrument}
                        ><i className="fas fa-plus" />
                        </button>
                      ) : (
                        <button
                          className="signup-submit__group--instruments__button"
                          type="button"
                          onClick={() => removeInstrument(index)}
                        ><i className="fas fa-minus" />
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <button type="submit">Envoyer</button>
            <button
              type="button"
              onClick={() => editFormToggle('editInstruments')}
            >
              <i className="fas fa-times-circle" />
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="home__instrument">
            <p className="home__instrument--description">Mes instruments:</p>
            <ul className="home__instrument--list">
              {plays[0] && plays.map((play) => (
                play.id && (
                <li className="home__instrument__tag" key={play.id}>
                  <span className="home__instrument__tag--name">{play.instrument.instrument_name}</span>
                  <span className="home__instrument__tag--level">{play.level && play.level.level_name}</span>
                </li>
                )
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => editFormToggle('editInstruments')}
          >
            <i className="fas fa-pen" />
          </button>
        </>
      )}
    </>
  );
};
Instruments.propTypes = {
  editInstruments: PropTypes.bool.isRequired,
  plays: PropTypes.arrayOf(PropTypes.shape({
    instrument: PropTypes.shape({
      instrument_name: PropTypes.string,
    }),
  })),
  deleteInstrumentAssociation: PropTypes.func.isRequired,
  handleSubmitInstruments: PropTypes.func.isRequired,
  instrumentsData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  levelsData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  instruments: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  addNewInstrument: PropTypes.func.isRequired,
  removeInstrument: PropTypes.func.isRequired,
  onSelectInput: PropTypes.func.isRequired,
  editFormToggle: PropTypes.func.isRequired,
};

Instruments.defaultProps = {
  plays: [{
    instrument: {
      instrument_name: '',
    },
  }],
};

export default Instruments;
