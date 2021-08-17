// == Import 
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from 'src/components/Header';
import Home from 'src/components/Home';
import Footer from 'src/components/Footer';

// == Import
import './styles.css';

// == Import fake datas
import cities from 'src/data/cities';
import departments from 'src/data/departments';
import instruments from 'src/data/instruments';
import invitations from 'src/data/invitations';
import levels from 'src/data/levels';
import messages from 'src/data/messages';
import music_styles from 'src/data/music_styles';
import regions from 'src/data/regions';
import user_appreciate_music_style from 'src/data/user_appreciate_music_style';
import user_has_instrument_level from 'src/data/user_has_instrument_level';
import usersData from 'src/data/users';


// == Composant
export default function App() { 
  return (
    <div className="app">
    <Header/>
    <Switch>
      <Route exact path='/'>
        <Home users={usersData}/>
      </Route>
      <Route exact path='/login'>
        <p>Connexion</p>
      </Route>
      <Route exact path='/signup'>
        <p>Inscription</p>
      </Route>
      <Route exact path='/contact'>
        <p>Contact</p>
      </Route>
      <Route exact path='/about'>
        <p>A propos</p>
      </Route>
      <Route exact path='/profile'>
        <p>Mon profil</p>
      </Route>
      <Route exact path='/search'>
        <p>Recherche</p>
      </Route>
      <Route exact path='/member/:profileId'>
        <p>Profil membre</p>
      </Route>
    </Switch>
    <Footer />
    </div>
  );
 
};

// == Export

