import test from 'ava';
import reducer from '../reducers/api';
import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../constants/ActionTypes';

test('return the initial state', t => {
  t.same(reducer(undefined, {}), {
    isFetching: false,
    result: null
  });
});

test('handle API_REQUEST', t => {
  t.same(reducer({}, {
    type: API_REQUEST
  }), {
    isFetching: true
  });
});

test('handle API_SUCCESS', t => {
  t.same(reducer({ isFetching: true }, {
    type: API_SUCCESS,
    result: true
  }), {
    isFetching: false,
    result: true
  });
});

test('handle API_FAILURE', t => {
  t.same(reducer({ isFetching: true }, {
    type: API_FAILURE,
    error: true
  }), {
    isFetching: false,
    result: null
  });
});
