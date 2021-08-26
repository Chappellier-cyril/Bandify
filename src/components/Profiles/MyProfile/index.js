/* eslint-disable camelcase */
import React from 'react';
import PropTypes, { shape } from 'prop-types';
import Avatar from './Avatar';
import Name from './Name';
import City from './City';
import Birthdate from './Birthdate';
import Email from './Email';
import Password from './Password';
import Description from './Description';
import Instruments from './Instruments';
import Styles from './Styles';
// == Import : local
import 'src/components/Profiles/style.scss';

import './style.scss';

const MyProfile = ({
  user,
  onWishToDeleteProfile,
  onDeleteProfile,
  isDeleteModalClosed,
  editFormToggle,
  editPhoto,
  editName,
  editCity,
  editBirthdate,
  editEmail,
  editPassword,
  editDescription,
  editInstruments,
  editStyles,
  firstName,
  lastName,
  dateOfBirth,
  emailInput,
  password,
  description,
  passwordShown,
  togglePasswordVisibility,
  onChangeProfileInput,
  handleSubmitPhoto,
  handleSubmitName,
  handleSubmitEmail,
  handleSubmitBirthdate,
  handleSubmitDescription,
  handleSubmitPassword,
  handleSubmitCity,
  handleSubmitInstruments,
  handleSubmitStyles,
  city,
  onCityChange,
  instruments,
  instrumentsData,
  levelsData,
  onSelectInput,
  addNewInstrument,
  removeInstrument,
  deleteInstrumentAssociation,

}) => {
  const {
    plays, styles, profil_image, email,
  } = user;

  return (
    <>
      <div className="myprofile__cards">
        {isDeleteModalClosed && (
        <div className="myprofile__cards--users">
          <>
            <div className="myprofile__user--container">
              <Avatar
                editPhoto={editPhoto}
                handleSubmitPhoto={handleSubmitPhoto}
                profil_image={profil_image}
                editFormToggle={editFormToggle}
              />
              <Name
                editName={editName}
                handleSubmitName={handleSubmitName}
                firstName={firstName}
                lastName={lastName}
                user={user}
                editFormToggle={editFormToggle}
                onChangeProfileInput={onChangeProfileInput}
              />
              <City
                editCity={editCity}
                handleSubmitCity={handleSubmitCity}
                onCityChange={onCityChange}
                city={city}
                editFormToggle={editFormToggle}
                user={user}
              />
              <Birthdate
                editBirthdate={editBirthdate}
                handleSubmitBirthdate={handleSubmitBirthdate}
                dateOfBirth={dateOfBirth}
                editFormToggle={editFormToggle}
                user={user}
                onChangeProfileInput={onChangeProfileInput}
              />
              <button
                type="button"
                onClick={onWishToDeleteProfile}
              >Supprimer mon profil
              </button>
              <Email
                editEmail={editEmail}
                handleSubmitEmail={handleSubmitEmail}
                emailInput={emailInput}
                onChangeProfileInput={onChangeProfileInput}
                editFormToggle={editFormToggle}
                email={email}
              />
              <Password
                editPassword={editPassword}
                handleSubmitPassword={handleSubmitPassword}
                passwordShown={passwordShown}
                password={password}
                togglePasswordVisibility={togglePasswordVisibility}
                editFormToggle={editFormToggle}
                onChangeProfileInput={onChangeProfileInput}
              />
              <Description
                editDescription={editDescription}
                handleSubmitDescription={handleSubmitDescription}
                editFormToggle={editFormToggle}
                user={user}
                description={description}
                onChangeProfileInput={onChangeProfileInput}
              />
              <Instruments
                editInstruments={editInstruments}
                plays={plays}
                deleteInstrumentAssociation={deleteInstrumentAssociation}
                handleSubmitInstruments={handleSubmitInstruments}
                instrumentsData={instrumentsData}
                levelsData={levelsData}
                instruments={instruments}
                addNewInstrument={addNewInstrument}
                removeInstrument={removeInstrument}
                onSelectInput={onSelectInput}
                editFormToggle={editFormToggle}
              />
              <Styles
                editFormToggle={editFormToggle}
                styles={styles}
                editStyles={editStyles}
                handleSubmitStyles={handleSubmitStyles}
              />
            </div>
            <h2 className="myprofile__friends-title">Mes amis</h2>
          </>
        </div>
        )}
        {!isDeleteModalClosed && (
        <div className="myprofile">
          <p>Êtes-vous sûr(e) de vouloir supprimer votre profil?</p>
          <button
            type="button"
            onClick={onDeleteProfile}
          >Oui
          </button>
          <button
            type="button"
            onClick={onWishToDeleteProfile}
          >Non
          </button>
        </div>
        )}
      </div>
    </>
  );
};

MyProfile.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    birthdate: PropTypes.string,
    email: PropTypes.string,
    user_description: PropTypes.string,
    profil_image: PropTypes.string,
    city: PropTypes.shape({
      city_name: PropTypes.string,
      code: PropTypes.string,
      department_code: PropTypes.string,
    }),
    plays: PropTypes.arrayOf(shape({
      instrument: PropTypes.shape({
        instrument_name: PropTypes.string,
      }),
      level: PropTypes.shape({
        level_name: PropTypes.string,
      }),
    })),
    styles: PropTypes.arrayOf(shape({
      music_name: PropTypes.string,
    })),
  }),
  onWishToDeleteProfile: PropTypes.func.isRequired,
  onDeleteProfile: PropTypes.func.isRequired,
  isDeleteModalClosed: PropTypes.bool.isRequired,
  editFormToggle: PropTypes.func.isRequired,
  editPhoto: PropTypes.bool.isRequired,
  editName: PropTypes.bool.isRequired,
  editCity: PropTypes.bool.isRequired,
  editBirthdate: PropTypes.bool.isRequired,
  editInstruments: PropTypes.bool.isRequired,
  editStyles: PropTypes.bool.isRequired,
  editEmail: PropTypes.bool.isRequired,
  editPassword: PropTypes.bool.isRequired,
  editDescription: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dateOfBirth: PropTypes.string,
  emailInput: PropTypes.string.isRequired,
  password: PropTypes.string,
  description: PropTypes.string.isRequired,
  passwordShown: PropTypes.bool.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
  onChangeProfileInput: PropTypes.func.isRequired,
  handleSubmitPhoto: PropTypes.func.isRequired,
  handleSubmitName: PropTypes.func.isRequired,
  handleSubmitEmail: PropTypes.func.isRequired,
  handleSubmitBirthdate: PropTypes.func.isRequired,
  handleSubmitDescription: PropTypes.func.isRequired,
  handleSubmitPassword: PropTypes.func.isRequired,
  handleSubmitCity: PropTypes.func.isRequired,
  handleSubmitStyles: PropTypes.func.isRequired,
  handleSubmitInstruments: PropTypes.func.isRequired,
  city: PropTypes.string,
  onCityChange: PropTypes.func.isRequired,
  instrumentsData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  levelsData: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  instruments: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  onSelectInput: PropTypes.func.isRequired,
  addNewInstrument: PropTypes.func.isRequired,
  removeInstrument: PropTypes.func.isRequired,
  deleteInstrumentAssociation: PropTypes.func.isRequired,
};

MyProfile.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
    birthdate: '',
    user_description: '',
    email: '',
    profil_image: '',
    city: {
      city_name: '',
      department_code: '',
    },
    plays: [
      {
        instrument: {
          instrument_name: '',
        },
        level: {
          level_name: '',
        },
      },
    ],
    styles: [
      {
        music_name: '',
      },
    ],
  },
  dateOfBirth: '',
  firstName: '',
  lastName: '',
  password: '',
  city: '',
};

export default MyProfile;
