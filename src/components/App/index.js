// == Import
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
// connected components
import Home from 'src/containers/Home';
import Profiles from 'src/containers/Profiles';
import Login from 'src/containers/Login';
import Signup from 'src/containers/Signup';
import Navbar from 'src/containers/Navbar';
import Header from 'src/containers/Header';
import Chatroom from 'src/containers/Chatroom';
import Notifications from 'src/containers/Notifications';
// components
import Contact from 'src/components/Contact';
import About from 'src/components/About';
import Footer from 'src/components/Footer';
// == Import
import './style.scss';
import axios from 'axios';

// == Composant
export default function App({
  isLogged, setReconnect, getInstruments,
  getLevels, getMusicStyles, getDepartments, getRegions, getFriends,
}) {
  // AU premier rendu, je veux recupérer mon token
  useEffect(() => {
    // On récupère notre token
    const token = localStorage.getItem('token');
    // Si on en a un, on fait une requête vers le serveur
    // En y emporter au passage, le "timbre" (headers : x-acces-token)
    if (token && token !== undefined) {
      axios.post('http://localhost:3000/checkToken', {
        headers: {
          'x-acces-token': localStorage.getItem('token'),
        },
      })
        .then((response) => {
        // On crée un objet user en réponse, pour rester logger
          if (response) {
            const user = {
              id: localStorage.getItem('userId'),
              email: localStorage.getItem('userEmail'),
              token: localStorage.getItem('token'),
            };
            setReconnect(user);
          }
        })
        .catch(() => {
          localStorage.clear();
        });
    }
    getInstruments();
    getLevels();
    getMusicStyles();
    getDepartments();
    getRegions();
  }, []);

  useEffect(() => {
    if (isLogged) {
      getFriends();
    }
  }, [isLogged]);
  return (
    <div className="app">
      <Navbar />
      <Chatroom />
      <Header />
      <div className="maincontainer">
        <Notifications />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/profile" />
          <Route exact path="/search" component={Home} />
          {isLogged
            ? <Route exact path="/member/:profileId" component={Profiles} />
            : <Redirect exact to="/" />}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  setReconnect: PropTypes.func.isRequired,
  getInstruments: PropTypes.func.isRequired,
  getLevels: PropTypes.func.isRequired,
  getMusicStyles: PropTypes.func.isRequired,
  getDepartments: PropTypes.func.isRequired,
  getRegions: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired,
};

// == Export
