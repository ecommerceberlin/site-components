
import { useMemo } from 'react'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import rootReducer from './reducers';
import rootSaga from './sagas';

const SET_CLIENT_STATE = 'SET_CLIENT_STATE';


const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}


const combinedReducers =  combineReducers(rootReducer)


const reducer = (state, action) => {

    switch(action.type){

      case HYDRATE:

      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      }
  
      if (action.payload.app === 'init') delete action.payload.app;
      if (action.payload.page === 'init') delete action.payload.page;
  
      // if (state.count) nextState.count = state.count // preserve count value on client side navigation

      return nextState

      break;

      case SET_CLIENT_STATE:
        return {
        ...state,
        fromClient: payload}
      break;

      default: 
        return combinedReducers(state, action)
    }
  
}


let store;

export const initStore = ({ctx}) => {

  const sagaMiddleware = createSagaMiddleware()

  const isServer = typeof window === 'undefined';

  if( isServer ){
     store = createStore(
      reducer, 
      bindMiddleware([sagaMiddleware])
    ) 
  }else{

    // we need it only on client side
    const {persistStore, persistReducer} = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage : storage,
      whitelist: ['fromClient', 'boothsSelected', 'app']
    };
    
    store = createStore(
      persistReducer(persistConfig, reducer), 
      bindMiddleware([sagaMiddleware])
    )

    store.__persistor = persistStore(store)

  }

  /**
   * next-redux-saga depends on `sagaTask` being attached to the store during `getInitialProps`.
   * It is used to await the rootSaga task before sending results to the client.
   * However, next-redux-wrapper creates two server-side stores per request:
   * One before `getInitialProps` and one before SSR (see issue #62 for details).
   * On the server side, we run rootSaga during `getInitialProps` only:
   */


 // if ((ctx && "req" in ctx) || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  //}

  
  return store
}

export const reduxWrapper = createWrapper(initStore, { debug: true })

export const setClientState = (clientState) => ({
    type: SET_CLIENT_STATE,
    payload: clientState
});