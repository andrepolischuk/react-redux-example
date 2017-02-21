import fetch from 'isomorphic-fetch';
import fetchJsonp from 'fetch-jsonp';

function callApi(endpoint, jsonp) {
  const fetchFn = jsonp ? fetchJsonp : fetch;

  return fetchFn(endpoint)
    .then(response => response.json())
    .then(response => {
      const { message } = response;
      if (message) return Promise.reject(message);
      return { ...response };
    });
}

export const CALL_API = 'CALL_API';

export default () => next => action => {
  const callApiOptions = action[CALL_API];

  if (typeof callApiOptions === 'undefined') {
    return next(action);
  }

  const { endpoint, jsonp, types } = callApiOptions;
  const [ requestType, successType, failureType ] = types;

  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  }

  next(actionWith({ type: requestType }));

  return callApi(endpoint, jsonp)
    .then(payload => next(actionWith({
      type: successType,
      payload
    })))
    .catch(error => next(actionWith({
      type: failureType,
      error
    })));
};
