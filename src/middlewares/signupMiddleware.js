import axios from 'axios';

const signupMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SUBMIT_SIGNUP') {
    const state = store.getState();
    const data = {
      firstName: state.signup.firstName,
      lastName: state.signup.firstName,
      dateOfBirth: state.signup.dateOfBirth,
      description: state.signup.description,
      email: state.signup.email,
      password: state.signup.password,
      city: state.signup.city,
      zipcode: state.signup.zipcode,
      departement: state.signup.departement,
      region: state.signup.region,
      instruments: state.signup.instruments,
      styles: state.signup.styles,
      image: action.image,
    };
    next(action);
  }
  else {
    next(action);
  }
};

export default signupMiddleware;
