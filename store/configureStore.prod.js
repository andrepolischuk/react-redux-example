import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const createStoreWithMiddlewares = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddlewares(rootReducer, initialState);
}
