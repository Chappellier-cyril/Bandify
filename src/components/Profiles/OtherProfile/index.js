/* eslint-disable camelcase */
import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { getAge } from 'src/selectors/user';

// == Import : local
import 'src/components/Profiles/style.scss';
import { firstLetterToUpper, restToLower } from 'src/selectors/city';
import './style.scss';

const OtherProfile = ({
  user, sendInvitation, pendingInvitations,
  acceptedInvitations, friends, wishToDeleteFriend,
  isDeleteFriendModalOpen, deleteFromFriendList,
}) => {
  const {
    plays, styles, profil_image,
  } = user;

  const alreadyInvitedUser = pendingInvitations
    .find((pendingInvitation) => pendingInvitation.to === user.id);

  const foundFriend = friends.find((friend) => friend.id === user.id);

  const foundUserToDelete = acceptedInvitations
    .find((acceptedInvitation) => acceptedInvitation.to === user.id
    || acceptedInvitation.from === user.id);

  const foundPendingUser = pendingInvitations
    .find((pendingInvitation) => pendingInvitation.to === user.id
    || pendingInvitation.from === user.id);

  const friend = friends
    .find((f) => f.id === user.id);

  return (
    <>
      {isDeleteFriendModalOpen && foundUserToDelete ? (
        <div className="profile">
          <p>Êtes-vous sûr(e) de vouloir supprimer {user.firstname} {user.lastname} de vos amis?</p>
          <button
            type="button"
            onClick={
              () => deleteFromFriendList(
                acceptedInvitations, pendingInvitations,
                friends, foundUserToDelete, foundPendingUser, friend,
              )
}
          >Oui
          </button>
          {/* //TODO => repasser wishToDeleteFriend à false si on clique ailleurs que sur Non */}
          <button
            type="button"
            onClick={wishToDeleteFriend}
          >Non
          </button>
        </div>
      ) : (
        <div className="profile__cards">
          <div className="profile__cards--users">
            <div className="profile__user--container">
              {profil_image && <img className="profile__user--picture" src={`http://localhost:3000/avatar/${profil_image}`} alt="avatar du membre" />}
              <div className="profile__user--short">
                <p className="profile__user--name">{user.firstname} {user.lastname}</p>
                {user.city && (
                <p className="profile__user--city">
                  {firstLetterToUpper(restToLower(user.city.city_name))}
                  ({user.city.department_code})
                </p>
                )}
                <p>{getAge(user.birthdate)} ans</p>
              </div>
              {/* Si l'utilisateur est déjà invité et qu'il est pas dans nos amis on affiche */}
              {alreadyInvitedUser && !foundFriend && (
              <p className="profile__user--invitation-status">Invitation envoyée <i className="fas fa-check" /></p>
              )}
              {/* Si l'utilisateur n'est pas encore invité et pas dans nos amis on affiche */}
              {!alreadyInvitedUser && !foundFriend && (
              <button
                type="button"
                className="profile__user--add-btn"
                onClick={() => sendInvitation(user.id)}
              >
                <i className="fas fa-plus" />
              </button>
              )}
              {/* Si l'utilisateur est dans nos amis */}
              {foundFriend && (
              <button
                type="button"
                className="profile__user--delete-btn"
                onClick={wishToDeleteFriend}
              >
                Supprimer
              </button>
              )}
            </div>
            <div className="profile__user--description">
              <p className="profile__user--description-title">Sa description:</p>
              <p className="profile__user--description-content">{user.user_description}</p>
            </div>
            {plays && (
            <div className="profile__instrument">
              <p className="profile__instrument--description">Ses instruments:</p>
              <ul className="profile__instrument--list">
                {plays.map((play) => (
                  play.id && (
                  <li className="profile__instrument__tag" key={play.id}>
                    <span className="profile__instrument__tag--name">{play.instrument.instrument_name}</span>
                    <span className="profile__instrument__tag--level">{play.level && play.level.level_name}</span>
                  </li>
                  )
                ))}
              </ul>
            </div>
            )}
            {styles && (
            <div className="profile__style">
              <p className="profile__style--description">Ses goûts musicaux:</p>
              <ul className="profile__style--list">
                {styles.map((musicStyle) => (
                  musicStyle.id && (
                  // Règle le souci musicStyle.id is undefined
                  <li className="profile__style__tag" key={musicStyle.id}>
                    <span className="profile__style__tag--name">{musicStyle.music_name}</span>
                  </li>
                  )
                ))}
              </ul>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

OtherProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    birthdate: PropTypes.string,
    user_description: PropTypes.string,
    profil_image: PropTypes.string,
    city: PropTypes.shape({
      city_name: PropTypes.string,
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
  sendInvitation: PropTypes.func.isRequired,
  pendingInvitations: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
};

OtherProfile.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
    birthdate: '',
    user_description: '',
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
};

export default OtherProfile;
