import { REQUEST_USER, RECEIVE_USER } from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  data: {}
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });
    default:
      return state;
  }
}
