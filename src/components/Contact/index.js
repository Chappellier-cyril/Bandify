import React from 'react';

import './style.scss';

const Contact = () => (
  // TODO champs contrôlés, récup du message + page
  // TODO "votre message a bien été renvoyer" + redirect home
    <form type="submit" className="contact__form">
      <h1 className="contact__form--title">Nous contacter</h1>

      <div className="contact__form__container">
        <input
          className="contact__form__container--input"
          name="firstName"
          id="firstName"
          type="text"
          placeholder="Prénom"
          required
        />
      </div>
      <div className="contact__form__container">
        <input
          className="contact__form__container--input"
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Nom"
          required
        />
      </div>
      <div className="contact__form__container">
        <input
          className="contact__form__container--input"
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="contact__form__container__message">
        <textarea
          className="contact__form__container__message--input"
          name="description"
          id="message" type="text"
          placeholder="Message"
          required
        />
      </div>
      <button
        type="submit"
        className="contact__form--submit"
      >
        Envoyer
      </button>
    </form>
);

export default Contact;
