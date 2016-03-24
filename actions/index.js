import fetch from 'isomorphic-fetch';
import { REQUEST_API, RECEIVE_API } from '../constants/ActionTypes';

function requestApi() {
  return {
    type: REQUEST_API
  };
}

function recieveApi({ result }) {
  return {
    result,
    type: RECEIVE_API
  };
}

function shouldFetchApi(state) {
  return !state.isFetching;
}

function fakeTimeout(json) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(json);
    }, 1000);
  });
}

function fetchApi() {
  return dispatch => {
    dispatch(requestApi());

    return fetch('http://localhost:3000/api.json')
      .then(fakeTimeout)
      .then(responce => responce.json())
      .then(json => dispatch(recieveApi(json)));
  };
}

export function fetchApiIfNeeded() {
  return (dispatch, getState) =>
    shouldFetchApi(getState()) && dispatch(fetchApi());
}
