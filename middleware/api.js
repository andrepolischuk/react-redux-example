import fetch from 'isomorphic-fetch';

function callApi(endpoint) {
  return fetch(`https://api.github.com/${endpoint}`)
    .then(response => response.json())
    .then(response => {
      const { error } = response;
      if (error) return Promise.reject(error);
      return { ...response };
    });
}

export const CALL_API = 'CALL_API';

export default () => next => action => {
  const callApiOptions = action[CALL_API];

  if (typeof callApiOptions === 'undefined') {
    return next(action);
  }

  const { types, endpoint } = callApiOptions;
  const [ requestType, successType, failureType ] = types;

  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  }

  next(actionWith({ type: requestType }));

  return callApi(endpoint)
    .then(payload => next(actionWith({
      payload,
      type: successType
    })))
    .catch(payload => next(actionWith({
      payload,
      error: true,
      type: failureType
    })));
};
