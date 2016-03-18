import 'whatwg-fetch';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

function requestUser() {
  return {
    type: REQUEST_USER
  };
}

function recieveUser(json) {
  return {
    type: RECEIVE_USER,
    data: json
  };
}

function shouldFetchUser(state) {
  return !state.isFetching;
}

function fakeTimeout(json) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(json);
    }, 1000);
  });
}

function fetchUser() {
  return dispatch => {
    dispatch(requestUser());

    return fetch('http://localhost:3000/user.json')
      .then(fakeTimeout)
      .then(responce => responce.json())
      .then(json => dispatch(recieveUser(json)));
  };
}

export function fetchUserIfNeeded() {
  return (dispatch, getState) =>
    shouldFetchUser(getState()) && dispatch(fetchUser());
}
