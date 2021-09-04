// == Import
import React, { useEffect } from 'react';
import {
  Route, Switch, useLocation,
} from 'react-router-dom';
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
import PageNotFound from 'src/components/PageNotFound';
// import Loader from 'src/components/Loader';
// == Import
import './style.scss';

// == Composant
export default function App({
  isLoading, isLogged, getInstruments,
  getLevels, getMusicStyles, getDepartments,
  getRegions, getMessages, getFriends, getPendingInvitations, getAcceptedInvitations, getInit,
}) {
  // AU premier rendu, je veux recupérer mon token
  useEffect(() => {
    /* LA GESTION DU TOKEN EST déplacé  DANS LE MIDDLEWARE D'AUTHENTIFICATION
    de gestion du TOKEN avec l'action 'GET_INIT' */
    getInit();
    getInstruments();
    getLevels();
    getMusicStyles();
    getDepartments();
    getRegions();
  }, []);

  useEffect(() => {
    if (isLogged) {
      getPendingInvitations();
      getAcceptedInvitations();
      getFriends();
      getMessages();
    }
  }, [isLogged]);

  const location = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  // if (isLoading) {
  //   return <Loader />;
  // }

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
          <Route exact path="/search" component={Home} />
          {isLogged
            ? <Route exact path="/member/:profileId" component={Profiles} />
            : <Route component={PageNotFound} />}
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  getInstruments: PropTypes.func.isRequired,
  getLevels: PropTypes.func.isRequired,
  getMusicStyles: PropTypes.func.isRequired,
  getDepartments: PropTypes.func.isRequired,
  getRegions: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  getPendingInvitations: PropTypes.func.isRequired,
  getAcceptedInvitations: PropTypes.func.isRequired,
  getInit: PropTypes.func.isRequired,
};

// == Export
