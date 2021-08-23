import React from 'react';

// == Import : local
import 'src/components/Profiles/style.scss';

// TODO => PropTypes

const MyProfile = ({ user }) => {
  const { plays, city } = user;

  return (
    <div className="profile__page">
      {plays && city ? (
        <div className="profile">
          <div className="profile__card">
            {/* //TODO => ajouter une photo */}
            <p>{user.firstname}, {user.lastname}</p>
            <h2>Ville: {city.city_name} ({city.zipcode})</h2>
            {/* //TODO => afficher l'age */}
            <p>{user.birthdate}</p>
            <button type="button">Supprimer mon profil</button>
            {/* //TODO => désinscription */}
            <p>{user.user_description}</p>
            <p>Mes instruments:</p>
            <div className="home__cards">
              <ul>
                {plays.map((play) => (
                  <li key={play.id}>
                    {play.instrument.instrument_name}
                    {play.level.level_name}
                  </li>

                ))}
              </ul>
            </div>
            <p>Mes goûts musicaux:</p>
            {/* //TODO => la route back pour récupérer les goûts d'un membre */}
            <h2 className="profile__friends-title">Mes amis</h2>
          </div>
        </div>
      ) : (null) }
    </div>
  );
};

export default MyProfile;
