import { createStore, applyMiddleware, compose } from 'redux';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(
    reduxPromise
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
