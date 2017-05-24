import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  DELETE_USER,
  HANDLE_ERROR
} from '../actions';

export const initialState = {
  users: [],
  error: null,
  fetching: false
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        error: null,
        fetching: true
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users,
          action.payload
        ],
        fetching: false
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        fetching: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(us => us.login !== action.payload.login)
      };
    case HANDLE_ERROR:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
}
