import { REQUEST_API, RECEIVE_API } from '../constants/ActionTypes';

export default function api(state = { isFetching: false, result: false }, action) {
  switch (action.type) {
    case REQUEST_API:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_API:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.result
      });
    default:
      return state;
  }
}
