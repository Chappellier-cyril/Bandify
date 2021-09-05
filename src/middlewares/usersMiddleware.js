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
      })
      .then(store.dispatch({
        type: 'EDIT_FORM_TOGGLE',
        key: 'editSound',
      }));
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

  if (action.type === 'SUBMIT_NEW_STYLE') {
    const options = {
      method: 'POST',
      url: `${process.env.BANDIFY_API_URL}/members/${state.login.id}/add_musicstyle`,
      data: {
        musicstyle_id: Number(action.style),
      },
    };
    axios(options)
      .then(() => {
        const foundStyle = state.settings.musicstyles.find((style) => (
          style.id === Number(action.style)));
        store.dispatch({ type: 'ADD_NEW_STYLE_SUCCESS', style: foundStyle });
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'SUBMIT_NEW_INSTRUMENT') {
    const options = {
      method: 'POST',
      url: `${process.env.BANDIFY_API_URL}/members/${state.login.id}/add_instrument`,
      data: {
        instrument_id: action.play.instrument_id,
        level_id: action.play.level_id ? action.play.level_id : null,
      },
    };
    axios(options)
      .then((response) => {
        store.dispatch({ type: 'ADD_NEW_INSTRUMENT_SUCCESS', play: response.data });
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_MODIFIED_ERROR', error: e });
      });
  }

  if (action.type === 'WISH_TO_DELETE_INSTRUMENT_ASSOCIATION') {
    const options = {
      method: 'DELETE',
      url: `${process.env.BANDIFY_API_URL}/members/${state.login.id}/add_instrument`,
      data: {
        instrument_id: action.play.instrument_id,
      },
    };
    axios(options)
      .then(() => {
        store.dispatch({ type: 'DELETE_INSTRUMENT_ASSOCIATION_SUCCESS', play: action.play });
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_MODIFIED_ERROR', error: e });
      });
  }
  if (action.type === 'WISH_TO_DELETE_STYLE') {
    const options = {
      method: 'DELETE',
      url: `${process.env.BANDIFY_API_URL}/members/${state.login.id}/add_musicstyle`,
      data: {
        musicstyle_id: action.style.id,
      },
    };
    axios(options)
      .then(() => {
        store.dispatch({ type: 'DELETE_STYLE_SUCCESS', style: action.style });
      })
      .catch((e) => {
        store.dispatch({ type: 'SUBMIT_MODIFIED_ERROR', error: e });
      });
  }
  next(action);
};

export default usersMiddleware;
