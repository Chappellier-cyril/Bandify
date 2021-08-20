import axios from 'axios';

const signupMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SUBMIT_SIGNUP') {
    console.log('je suis dans le middleware du signup');
    const state = store.getState();
    const createUser = {
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
    const options = {
      method: 'POST',
      url: 'http://localhost:3000/signup',
      headers: {
        'Content-type': 'application/json',
      },
      data: createUser,
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        store.dispatch({ type: 'SUBMIT_SIGNUP_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'ON_SUBMIT_ERROR', error: e });
      });
    next(action);
  }
  else {
    next(action);
  }
};

export default signupMiddleware;
