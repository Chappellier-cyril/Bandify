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
// components
import Contact from 'src/components/Contact';
import About from 'src/components/About';
import Footer from 'src/components/Footer';

// == Import
import './style.scss';

// == Composant
export default function App({ isLogged }) {
  // AU premier rendu, je veux recupérer mon token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      //TODO on stocke le token dans notre state user et on voir pour recuperer email et id au moment du setItem dans le ON_LOGIN_SUBMIT
      // pour pouvoir autologgé 
    }

  }, []);
  return (
    <div className="app">
      <Header />
      <Navbar />
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

        <Route exact path="/search" component={Home} />
        {isLogged
          ? <Route exact path="/member/:profileId" component={Profiles} />
          : <Redirect exact to="/" />}
      </Switch>
      <Footer />
    </div>
  );
}

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

// == Export
