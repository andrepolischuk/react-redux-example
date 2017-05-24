import { CALL_API } from '../middleware/api';

export const HANDLE_ERROR = 'HANDLE_ERROR';

export function handleError(error) {
  return {
    type: HANDLE_ERROR,
    payload: {
      error
    }
  };
}

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

function fetchUser(endpoint) {
  return {
    [CALL_API]: {
      types: [
        FETCH_USER_REQUEST,
        FETCH_USER_SUCCESS,
        FETCH_USER_FAILURE
      ],
      endpoint
    }
  };
}

export function addUser(login) {
  return (dispatch, getState) => {
    const exists = getState().user.users.find(us => us.login === login);

    if (exists) {
      return dispatch(handleError(`${login} already exists`));
    }

    return dispatch(fetchUser(`users/${login}`));
  };
}

export const DELETE_USER = 'DELETE_USER';

export function deleteUser(login) {
  return {
    type: DELETE_USER,
    payload: {
      login
    }
  };
}
