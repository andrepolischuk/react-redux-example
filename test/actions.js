import test from 'ava';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchApiIfNeeded } from '../actions';
import { REQUEST_API, RECEIVE_API } from '../constants/ActionTypes';

const mockStore = configureStore([ thunk ]);
const store = mockStore({});

nock('http://localhost:3000')
  .get('/api.json')
  .reply(200, {
    result: true
  });

test('fetch api', async t => {
  await store.dispatch(fetchApiIfNeeded());

  t.same(store.getActions(), [
    { type: REQUEST_API },
    { type: RECEIVE_API, result: true }
  ]);
});
