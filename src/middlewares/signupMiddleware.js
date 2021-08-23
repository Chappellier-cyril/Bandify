import axios from 'axios';

const signupMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SUBMIT_SIGNUP') {
    console.log('je suis dans le middleware du signup');
    console.log(action.image.file);
    const state = store.getState();
    // const createUser = {
    //   firstName: state.signup.firstName,
    //   lastName: state.signup.firstName,
    //   dateOfBirth: state.signup.dateOfBirth,
    //   description: state.signup.description,
    //   email: state.signup.email,
    //   password: state.signup.password,
    //   city: state.signup.city,
    //   city_code: state.signup.zipcode,
    //   instruments: state.signup.instruments,
    //   styles: state.signup.styles,
    // };
    const form = new FormData();
    form.set('user', {
      firstName: state.signup.firstName,
      lastName: state.signup.firstName,
      dateOfBirth: state.signup.dateOfBirth,
      description: state.signup.description,
      email: state.signup.email,
      password: state.signup.password,
      city: state.signup.city,
      city_code: state.signup.zipcode,
      instruments: state.signup.instruments,
      styles: state.signup.styles,
    });
    form.append('file', action.image);

    const options = {
      method: 'POST',
      url: 'http://localhost:3000/signup',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: form,
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
