import { CALL_API } from '../middleware/api';
import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../constants/ActionTypes';

function fetchStatusApi() {
  return {
    [CALL_API]: {
      types: [
        API_REQUEST,
        API_SUCCESS,
        API_FAILURE
      ],
      endpoint: 'https://status.github.com/api/status.json',
      jsonp: true
    }
  };
}

function fetchUserApi(name) {
  return {
    [CALL_API]: {
      types: [
        API_REQUEST,
        API_SUCCESS,
        API_FAILURE
      ],
      endpoint: `https://api.github.com/users/${name}`
    }
  };
}

function shouldFetchApi(state) {
  return !state.isFetching;
}

export function fetchApiIfNeeded(name) {
  return (dispatch, getState) =>
    shouldFetchApi(getState()) && dispatch(name ? fetchUserApi(name) : fetchStatusApi());
}
