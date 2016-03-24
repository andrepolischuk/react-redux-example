import test from 'ava';
import reducer from '../reducers/api';
import { REQUEST_API, RECEIVE_API } from '../constants/ActionTypes';

test('return the initial state', t => {
  t.same(reducer(undefined, {}), {
    isFetching: false,
    result: false
  });
});

test('handle REQUEST_API', t => {
  t.same(reducer({}, {
    type: REQUEST_API
  }), {
    isFetching: true
  });
});

test('handle RECEIVE_API', t => {
  t.same(reducer({ isFetching: true }, {
    type: RECEIVE_API,
    result: true
  }), {
    isFetching: false,
    result: true
  });
});
