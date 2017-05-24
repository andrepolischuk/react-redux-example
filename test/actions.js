import test from 'ava';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import { initialState as user } from '../reducers/user';

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  DELETE_USER,
  HANDLE_ERROR,
  addUser,
  deleteUser,
  handleError
} from '../actions';

const initialState = {
  user
};

const mockStore = configureStore([ thunk, api ]);

test('add user', async t => {
  const store = mockStore(initialState);

  await store.dispatch(addUser('andrepolischuk'));

  t.is(store.getActions()[0].type, FETCH_USER_REQUEST);
  t.is(store.getActions()[1].type, FETCH_USER_SUCCESS);
  t.is(store.getActions()[1].payload.login, 'andrepolischuk');
});

test('delete user', async t => {
  const store = mockStore(initialState);

  await store.dispatch(addUser('andrepolischuk'));
  store.dispatch(deleteUser('andrepolischuk'));

  t.deepEqual(store.getActions()[2], {
    type: DELETE_USER,
    payload: {
      login: 'andrepolischuk'
    }
  });
});

test('handle error', async t => {
  const store = mockStore(initialState);

  store.dispatch(handleError('Error'));

  t.deepEqual(store.getActions(), [
    {
      type: HANDLE_ERROR,
      payload: {
        error: 'Error'
      }
    }
  ]);
});
