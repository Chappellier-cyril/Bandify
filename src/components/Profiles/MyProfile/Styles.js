import React from 'react';
import PropTypes from 'prop-types';

const Styles = ({
  editFormToggle, styles, editStyles, handleSubmitStyles,
}) => (
  <>
    <p>
      Mes goûts musicaux:
      {/* //TODO => edit */}
      <span>
        <button
          type="button"
          onClick={() => editFormToggle('editStyles')}
        >
          <i className="fas fa-pen" />
        </button>
      </span>
    </p>
    {styles && (
    <div className="home__cards">
      <ul>
        {styles.map((musicStyle) => (
          musicStyle.id && (
          // Règle le souci musicStyle.id is undefined
          <li key={musicStyle.id}>
            {musicStyle.music_name}
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
