import React from 'react';

import './style.scss';

const Contact = () => (
  // TODO champs contrôlés, récup du message + page
  // TODO "votre message a bien été renvoyer" + redirect home
  <div className="contact-submit__container">
    <h1 className="contact-submit__title">Nous contacter</h1>

    <form type="submit" className="contact-submit__form">
      <div className="contact-submit__group">
        <label htmlFor="firstName">
          <input name="firstName" id="firstName" type="text" placeholder="Prénom" required />
        </label>
      </div>
      <div className="contact-submit__group">
        <label htmlFor="lastName">
          <input name="lastName" id="lastName" type="text" placeholder="Nom" required />
        </label>
      </div>
      <div className="contact-submit__group">
        <label htmlFor="email">
          <input name="email" id="email" type="email" placeholder="Email" required />
        </label>
      </div>
      <div className="contact-submit__group__message">
        <label htmlFor="message">
          <textarea name="description" id="message" type="text" placeholder="Message" required />
        </label>
      </div>
      <button type="submit">ENVOYER</button>
    </form>
  </div>
);

export default Contact;
