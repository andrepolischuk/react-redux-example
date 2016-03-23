import test from 'ava';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchUserIfNeeded } from '../actions';
import { REQUEST_USER, RECEIVE_USER } from '../constants/ActionTypes';

const mockStore = configureStore([thunk]);
const store = mockStore({});

nock('http://localhost:3000')
  .get('/user.json')
  .reply(200, {
    name: 'Ivan'
  });

test('fetch user', async t => {
  await store.dispatch(fetchUserIfNeeded());

  t.same(store.getActions(), [
    { type: REQUEST_USER },
    { type: RECEIVE_USER, data: { name: 'Ivan' } }
  ]);
});
