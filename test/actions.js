import test from 'ava';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import { fetchApiIfNeeded } from '../actions';
import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../constants/ActionTypes';

const mockStore = configureStore([ thunk, api ]);

test.afterEach(() => {
  nock.cleanAll();
});

test('fetch status api', async t => {
  const store = mockStore({});

  nock('https://status.github.com')
    .get('/api/status.json')
    .reply(200);

  await store.dispatch(fetchApiIfNeeded());

  t.deepEqual(store.getActions(), [
    { type: API_REQUEST },
    {
      type: API_FAILURE,
      error: new ReferenceError('window is not defined')
    }
  ]);
});

test('fetch user api', async t => {
  const store = mockStore({});

  nock('https://api.github.com')
    .get('/users/foo')
    .reply(200, {
      name: 'Foo'
    });

  await store.dispatch(fetchApiIfNeeded('foo'));

  t.deepEqual(store.getActions(), [
    { type: API_REQUEST },
    {
      type: API_SUCCESS,
      payload: {
        name: 'Foo'
      }
    }
  ]);
});
