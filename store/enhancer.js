import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const enhanser = applyMiddleware(thunk);

if (process.env.NODE_ENV === 'production') {
  module.exports = enhanser;
} else {
  const { persistState } = require('redux-devtools');
  const DevTools = require('../containers/DevTools').default;

  module.exports = compose(
    enhanser,
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&#]+)\b/
      )
    )
  );
}
