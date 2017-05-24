import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';

const rootReducer = combineReducers({
  routing,
  user
});

export default rootReducer;
