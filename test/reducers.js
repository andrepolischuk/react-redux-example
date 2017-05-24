import test from 'ava';
import reducer, { initialState } from '../reducers/user';

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  DELETE_USER,
  HANDLE_ERROR
} from '../actions';

test('return the initial state', t => {
  t.deepEqual(reducer(undefined, {}), initialState);
});

test('handle FETCH_USER_REQUEST', t => {
  t.deepEqual(reducer(initialState, {
    type: FETCH_USER_REQUEST
  }), {
    users: [],
    error: null,
    fetching: true
  });
});

test('handle FETCH_USER_SUCCESS', t => {
  t.deepEqual(reducer({
    users: [],
    error: null,
    fetching: true
  }, {
    type: FETCH_USER_SUCCESS,
    payload: {
      login: 'andrepolischuk'
    }
  }), {
    users: [
      {
        login: 'andrepolischuk'
      }
    ],
    error: null,
    fetching: false
  });
});

test('handle FETCH_USER_FAILURE', t => {
  t.deepEqual(reducer({
    users: [],
    error: null,
    fetching: true
  }, {
    type: FETCH_USER_FAILURE
  }), {
    users: [],
    error: null,
    fetching: false
  });
});

test('handle DELETE_USER', t => {
  t.deepEqual(reducer({
    users: [
      {
        login: 'andrepolischuk'
      }
    ],
    error: null,
    fetching: false
  }, {
    type: DELETE_USER,
    payload: {
      login: 'andrepolischuk'
    }
  }), initialState);
});

test('handle HANDLE_ERROR', t => {
  t.deepEqual(reducer(initialState, {
    type: HANDLE_ERROR,
    payload: {
      error: 'Error'
    }
  }), {
    users: [],
    error: 'Error',
    fetching: false
  });
});
