import axios from 'axios';

const signupMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'SUBMIT_SIGNUP') {
    const form = new FormData();
    form.append('firstname', state.signup.firstName);
    form.append('lastname', state.signup.lastName);
    form.append('birthdate', state.signup.dateOfBirth);
    form.append('user_description', state.signup.description);
    form.append('email', state.signup.email);
    form.append('user_password', state.signup.password);
    form.append('city_code', state.signup.code);
    form.append('instruments', JSON.stringify(state.signup.instruments));
    form.append('styles', JSON.stringify(state.signup.styles));
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
        if (response.data.success) {
          store.dispatch({ type: 'SUBMIT_SUCCESS', success: response.data.success });
        }
        if (response.data.error) {
          throw (response.data.error);
        }
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_ERROR', error: e.message ? e.message : e });
      });
    next(action);
  }
  else {
    next(action);
  }
};

export default signupMiddleware;
