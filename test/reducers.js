import test from 'ava';
import reducer from '../reducers/user';
import { REQUEST_USER, RECEIVE_USER } from '../constants/ActionTypes';

test('return the initial state', t => {
  t.same(reducer(undefined, {}), {
    isFetching: false,
    data: {}
  });
});

test('return handle REQUEST_USER', t => {
  t.same(reducer({}, {
    type: REQUEST_USER
  }), {
    isFetching: true
  });
});

test('return handle RECEIVE_USER', t => {
  t.same(reducer({ isFetching: true }, {
    type: RECEIVE_USER,
    data: { name: 'Ivan' }
  }), {
    isFetching: false,
    data: { name: 'Ivan' }
  });
});
