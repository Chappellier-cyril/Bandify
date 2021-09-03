import axios from 'axios';

const usersMiddleware = (store) => (next) => (action) => {
  const url = window.location.href;
  // pour avoir le dernier segment de l'url
  const lastSegmentUrl = url.split('/').pop();

  const state = store.getState();

  if (action.type === 'GET_MEMBERS') {
    state.settings.isLoading = true;

    const options = {
      method: 'GET',
      url: `${process.env.BANDIFY_API_URL}/members`,
      headers: {
        // On recupère le token stocker en localStorage (getItem)
        'x-acces-token': localStorage.getItem('token'),
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'GET_MEMBERS_SUCCESS', users: response.data });
      });
  }

  if (action.type === 'GET_ONE_MEMBER') {
    state.settings.isLoading = true;

    axios.get(`${process.env.BANDIFY_API_URL}/members/${lastSegmentUrl}`)
      .then((response) => {
        store.dispatch({ type: 'GET_ONE_MEMBER_SUCCESS', user: response.data });
      });
  }

  if (action.type === 'SAID_YES_TO_DELETE_PROFILE') {
    axios.delete(`${process.env.BANDIFY_API_URL}/members/${lastSegmentUrl}`)
      .then(() => {
        store.dispatch({ type: 'ON_DELETE_PROFILE_SUCCESS' });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_PHOTO') {
    const form = new FormData();
    form.append('file', action.image);

    const options = {
      method: 'PATCH',
      url: `${process.env.BANDIFY_API_URL}/members/${lastSegmentUrl}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: form,
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'PHOTO_MODIFIED_SUCCESS', user: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'PHOTO_MODIFIED_ERROR', error: e.message });
      });
  }

  if (action.type === 'SUBMIT_SOUND') {
    const form = new FormData();
    form.append('file', action.sound);

    const options = {
      method: 'POST',
      url: `${process.env.BANDIFY_API_URL}/members/${lastSegmentUrl}/sound`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: form,
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'SOUND_ADDED_SUCCESS', sound: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'PHOTO_MODIFIED_ERROR', error: e.message });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_NAME') {
    const options = {
      method: 'PATCH',
      url: `${process.env.BANDIFY_API_URL}/members/${lastSegmentUrl}`,
      data: {
        firstname: state.users.user.firstName,
        lastname: state.users.user.lastName,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'NAME_MODIFIED_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_EMAIL') {
    const options = {
      method: 'PATCH',
      url: `${process.env.BANDIFY_API_URL}/members/${lastSegmentUrl}`,
      data: {
        email: state.users.user.email,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'EMAIL_MODIFIED_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_BIRTHDATE') {
    const options = {
      method: 'PATCH',
      url: `${process.env.BANDIFY_API_URL}/members/${lastSegmentUrl}`,
      data: {
        birthdate: state.users.user.dateOfBirth,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'BIRTHDATE_MODIFIED_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_DESCRIPTION') {
    const options = {
      method: 'PATCH',
      url: `${process.env.BANDIFY_API_URL}/members/${lastSegmentUrl}`,
      data: {
        user_description: state.users.user.user_description,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'DESCRIPTION_MODIFIED_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_PASSWORD') {
    const options = {
      method: 'PATCH',
      url: `${process.env.BANDIFY_API_URL}/members/${lastSegmentUrl}`,
      data: {
        user_password: state.users.user.user_password,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'PASSWORD_MODIFIED_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_CITY') {
    const options = {
      method: 'PATCH',
      url: `${process.env.BANDIFY_API_URL}/members/${lastSegmentUrl}`,
      data: {
        city_code: state.users.code,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'CITY_MODIFIED_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_STYLES') {
    console.log(action);
  }

  if (action.type === 'SUBMIT_MODIFIED_INSTRUMENTS') {
    console.log(action);
  }

  if (action.type === 'WISH_TO_DELETE_INSTRUMENT_ASSOCIATION') {
    console.log(action);
  }
  next(action);
};

export default usersMiddleware;
