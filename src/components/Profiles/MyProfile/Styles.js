import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Styles = ({
  editFormToggle, styles, stylesData, editStyles, handleSubmitStyles, isEditing, deleteStyle,
}) => {
  const [newStyle, setNewStyle] = useState();
  const [filteredStyles, setFilteredStyles] = useState();
  /* On filtre pour ne proposer que les instruments disponibles que
  l'utilisateur n'a pas déjà dans sa collection */
  useEffect(() => {
    setFilteredStyles(
      stylesData.filter((s) => {
        const styleFound = styles.find((style) => style.id === s.id);
        if (styleFound) {
          return false;
        }
        return true;
      }),
    );
  }, [styles]);
  return (
    <>
      {styles && (
      <div className="myprofile__style">
        <p className="myprofile__style--description">Goûts musicaux :
          {
          isEditing && (
            <span>
              <button
                type="button"
                onClick={() => editFormToggle('editStyles')}
                className="myprofile__user--edit-styles"
              >
                <i className="fas fa-pen" />
              </button>
            </span>
          )
        }
        </p>
        <ul className="myprofile__style--list">
          {styles && styles.map((musicStyle) => (
            musicStyle.id && (
            // Règle le souci musicStyle.id is undefined
            <li className="myprofile__style__tag" key={musicStyle.id}>
              <span className="myprofile__style__tag--name">{musicStyle.music_name}</span>
              {isEditing && editStyles && (
              <button className="delete--association" type="button" onClick={() => deleteStyle(musicStyle)}>
                <i className="fas fa-times-circle delete--association" />
              </button>
              )}
            </li>

            )
          ))}
        </ul>
        {
        isEditing && editStyles && (
          <>

              {styles.length > 3 && <p className="signup-submit__error">Vous avez atteint le nombre maximum de styles de musique</p>}
              {
                styles.length < 4 && (
                  <>
                    <div key="style select" className="signup-submit__group--styles__container">
                      <div className="signup-submit__group--styles__input-container">
                        <select className="signup-submit__group__select" name="musicStyle" id="musicStyle" onChange={(e) => setNewStyle(e.target.value)}>
                          <option value="">Choisir un style de musique</option>
                          {
                    stylesData && filteredStyles && filteredStyles.map((style) => (
                      <option value={style.id} key={style.music_name}>
                        {style.music_name}
                      </option>
                    ))
                  }
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="myprofile__user--edit-submit-btn"
                      onClick={(e) => {
                        handleSubmitStyles(e, newStyle);
                        setNewStyle();
                      }}
                      disabled={!newStyle}
                    >Ajouter un Style de musique
                    </button>
                  </>
                )
              }
          </>
        )
      }
      </div>
      )}
    </>
  );
};

Styles.propTypes = {
  styles: PropTypes.array.isRequired,
  stylesData: PropTypes.array.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editFormToggle: PropTypes.func.isRequired,
  editStyles: PropTypes.bool.isRequired,
  handleSubmitStyles: PropTypes.func.isRequired,
  deleteStyle: PropTypes.func.isRequired,
};

export default Styles;
