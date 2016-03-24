import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import api from './api';

const rootReducer = combineReducers({
  routing,
  api
});

export default rootReducer;
