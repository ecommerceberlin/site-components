import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['boothsSelected', 'app']
};

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (if any)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */

export function store(initialState = {}, options = {}) {
  const { isServer } = options;

  const _store = createStore(
    persistCombineReducers(persistConfig, reducers),
    initialState,
    bindMiddleware([sagaMiddleware])
  );

  /**
   * next-redux-saga depends on `runSagaTask` and `sagaTask` being attached to the store.
   *
   *   `runSagaTask` is used to rerun the rootSaga on the client when in sync mode (default)
   *   `sagaTask` is used to await the rootSaga task before sending results to the client
   *
   */

  _store.runSagaTask = () => {
    _store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  // run the rootSaga initially
  _store.runSagaTask();

  const persistor = persistStore(_store, null, () => {
    /* getNotified! */
  });

  return _store;
}

export default store;
