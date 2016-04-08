import { CALL_API } from '../middleware/api';
import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../constants/ActionTypes';

function fetchApi(params) {
  return {
    [CALL_API]: {
      types: [ API_REQUEST, API_SUCCESS, API_FAILURE ],
      params
    }
  };
}

function shouldFetchApi(state) {
  return !state.isFetching;
}

export function fetchApiIfNeeded(params) {
  return (dispatch, getState) =>
    shouldFetchApi(getState().api) && dispatch(fetchApi(params));
}
