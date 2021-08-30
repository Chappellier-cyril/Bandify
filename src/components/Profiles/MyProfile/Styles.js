import React from 'react';
import PropTypes from 'prop-types';

const Styles = ({
  editFormToggle, styles, editStyles, handleSubmitStyles,
}) => (
  <>
    {/* //TODO => edit */}
    {styles && (
    <div className="myprofile__style">
      <p className="myprofile__style--description">Mes goûts musicaux:
        <span>
          <button
            type="button"
            onClick={() => editFormToggle('editStyles')}
            className="myprofile__user--edit-styles"
          >
            <i className="fas fa-pen" />
          </button>
        </span>
      </p>
      <ul className="myprofile__style--list">
        {styles.map((musicStyle) => (
          musicStyle.id && (
          // Règle le souci musicStyle.id is undefined
          <li className="myprofile__style__tag" key={musicStyle.id}>
            <span className="myprofile__style__tag--name">{musicStyle.music_name}</span>
          </li>
          )
        ))}
      </ul>
    </div>
    )}
  </>
);

Styles.propTypes = {
  styles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    music_content: PropTypes.string,
  })),
  editFormToggle: PropTypes.func.isRequired,
  editStyles: PropTypes.bool.isRequired,
  handleSubmitStyles: PropTypes.func.isRequired,
};
Styles.defaultProps = {
  styles: [{
    id: '',
    music_content: '',
  }],
};

export default Styles;
