
import { useMemo } from 'react'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';
import rootSaga from './sagas';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['boothsSelected', 'app']
};


const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const initStore = (preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
                      persistCombineReducers(persistConfig, reducers), 
                      preloadedState, 
                      bindMiddleware([sagaMiddleware])
    )

  store.sagaTask = sagaMiddleware.run(rootSaga)


  /**
   * 
   *  
   * next-redux-saga depends on `runSagaTask` and `sagaTask` being attached to the store.
   *
   *   `runSagaTask` is used to rerun the rootSaga on the client when in sync mode (default)
   *   `sagaTask` is used to await the rootSaga task before sending results to the client
   */

   /** 
  _store.runSagaTask = () => {
    _store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  // run the rootSaga initially
  _store.runSagaTask();

   */

  const persistor = persistStore(store, null, () => {
    /* getNotified! */
  });

  return store
}


export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}


// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState])
//   return store
// }


export const wrapper = createWrapper(initializeStore, { debug: true })