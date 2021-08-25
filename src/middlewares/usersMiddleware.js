import axios from 'axios';

const usersMiddleware = (store) => (next) => (action) => {
  const url = window.location.href;
  // pour avoir le dernier segment de l'url
  const lastSegmentUrl = url.split('/').pop();
  

  const state = store.getState();

  if (action.type === 'GET_MEMBERS') {
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/members',
      headers: {
        // Dans le headers on fait passer notre token via la "méthode" x-acces-token
        'x-acces-token': localStorage.getItem('token'),
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'GET_MEMBERS_SUCCESS', users: response.data });
      });
  }

  if (action.type === 'GET_ONE_MEMBER') {
    axios.get(`http://localhost:3000/members/${lastSegmentUrl}`)
      .then((response) => {
        store.dispatch({ type: 'GET_ONE_MEMBER_SUCCESS', user: response.data });
      });
  }

  if (action.type === 'SAID_YES_TO_DELETE_PROFILE') {
    axios.delete(`http://localhost:3000/members/${lastSegmentUrl}`)
      .then(() => {
        store.dispatch({ type: 'ON_DELETE_PROFILE_SUCCESS' });
      });
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
        firstname: state.users.user.firstName,
        lastname: state.users.user.lastName,
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
        email: state.users.user.email,
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
        birthdate: state.users.user.dateOfBirth,
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

  if (action.type === 'SUBMIT_MODIFIED_DESCRIPTION') {
    const options = {
      method: 'PATCH',
      url: `http://localhost:3000/members/${lastSegmentUrl}`,
      data: {
        user_description: state.users.user.user_description,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'DESCRIPTION_MODIFIED_SUCCESS', data: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'DESCRIPTION_MODIFIED_ERROR', error: e });
      });
  }
  next(action);
};

export default usersMiddleware;
