// == Import
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// connected components
import Home from 'src/containers/Home';
import Profile from 'src/containers/Profile';
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
export default function App() {
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
        <Route exact path="/profile">
          <p>Mon profil</p>
        </Route>
        <Route exact path="/search">
          <p>Recherche</p>
        </Route>
        <Route exact path="/member/:profileId" component={Profile} />
      </Switch>
      <Footer />
    </div>
  );
}

// == Export
