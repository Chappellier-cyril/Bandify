import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

export default function Home({ users }) {
  const [isLogged, setIsLogged] = useState(true);
  const [searchedQuery, setSearchedQuery] = useState('');

  const onChangeInput = (setState, event) => {
    setState(event.target.value);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    // appel a la bdd
  };

  return (
    <div className="main">

      {isLogged ? (
        <>
          <form onSubmit={onFormSubmit} method="GET">
            <input
              type="search"
              name="searchBar"
              id="searchBar"
              placeholder="Rechercher un membre..."
              value={searchedQuery}
              onChange={(e) => onChangeInput(setSearchedQuery, e)}
            />
          </form>

          <div className="home__cards">
            {users.map((user) => (
              <Link to={`/member/${user.id}`} key={user.id}>
                <li className="home__cards-users">{user.firstname}</li>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="home__desc">
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </h2>

          <Link to="/signup" className="home__signup-btn">Rejoindre la communauté</Link>

          <div className="home__cards">
            {users.map((user) => (
              <li className="home__cards-users" key={user.id}>{user.firstname}</li>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
