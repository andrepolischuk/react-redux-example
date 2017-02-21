import test from 'ava';
import reducer from '../reducers/api';
import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../constants/ActionTypes';

test('return the initial state', t => {
  t.deepEqual(reducer(undefined, {}), {
    isFetching: false,
    result: null
  });
});

test('handle API_REQUEST', t => {
  t.deepEqual(reducer({}, {
    type: API_REQUEST
  }), {
    isFetching: true
  });
});

test('handle API_SUCCESS', t => {
  t.deepEqual(reducer({ isFetching: true }, {
    type: API_SUCCESS,
    payload: {
      status: 'good'
    }
  }), {
    isFetching: false,
    result: {
      status: 'good'
    }
  });
});

test('handle API_FAILURE', t => {
  t.deepEqual(reducer({ isFetching: true }, {
    type: API_FAILURE,
    error: 'Not Found'
  }), {
    isFetching: false,
    result: null
  });
});
