import axios from 'axios';

const signupMiddleware = (store) => (next) => (action) => {
  const url = window.location.href;
  // pour avoir le dernier segment de l'url
  const lastSegmentUrl = url.split('/').pop();

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

  if (action.type === 'SUBMIT_MODIFIED_PHOTO') {
    const form = new FormData();
    form.append('file', action.image);

    const options = {
      method: 'PATCH',
      url: `http://localhost:3000/members/${lastSegmentUrl}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: form,
    };
    axios(options)
      .then((response) => {
        if (response.data.success) {
          store.dispatch({ type: 'PHOTO_MODIFIED_SUCCESS', success: response.data.success });
        }
        if (response.data.error) {
          throw (response.data.error);
        }
      })
      .catch((e) => {
        store.dispatch({ type: 'PHOTO_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_NAME') {
    const options = {
      method: 'PATCH',
      url: `http://localhost:3000/members/${lastSegmentUrl}`,
      data: {
        firstname: state.signup.firstName,
        lastname: state.signup.lastName,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'NAME_MODIFIED_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'NAME_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_EMAIL') {
    const options = {
      method: 'PATCH',
      url: `http://localhost:3000/members/${lastSegmentUrl}`,
      data: {
        email: state.signup.email,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'EMAIL_MODIFIED_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'EMAIL_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_BIRTHDATE') {
    const options = {
      method: 'PATCH',
      url: `http://localhost:3000/members/${lastSegmentUrl}`,
      data: {
        birthdate: state.signup.dateOfBirth,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'BIRTHDATE_MODIFIED_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'BIRTHDATE_MODIFIED_ERROR', error: e });
      });
  }
};

export default signupMiddleware;
