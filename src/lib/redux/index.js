
// import { useMemo } from 'react'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import rootReducer from './reducers';
import rootSaga from './sagas';
// import merge from 'lodash/merge'

 

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


/**
 * 

  Server and Client state separation
  
  Each time when pages that have getStaticProps or getServerSideProps are opened by user the HYDRATE action will be dispatched.
  The payload of this action will contain the state at the moment of static generation or server side rendering, so your reducer must merge it with existing client state properly.
  The easiest and most stable way to make sure nothing is accidentally overwritten is to make sure that your reducer applies client side and server side actions to different substates of your state and they never clash:
  */



      const nextState = {
        
        ...state, // use previous state

        resources: {
          ...action.payload.resources,
          ...state.resources, 
          texts : action.payload.resources.texts
        }, // apply delta from hydration

        resourcelists: {
          ...action.payload.resourcelists,
          ...state.resourcelists
        }, 

        settings: action.payload.settings
      }
  
      // if (action.payload.app === 'init') delete action.payload.app;
      // if (action.payload.page === 'init') delete action.payload.page;
  
      // if (state.resources.texts) nextState.resources.texts = state.resources.texts // preserve count value on client side navigation

      return nextState

      //return merge(state, action.payload)

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
      whitelist: ['fromClient', 'app', 'social']
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

export const reduxWrapper = createWrapper(initStore, { debug: process.env.NODE_ENV !== 'production' })

export const setClientState = (clientState) => ({
    type: SET_CLIENT_STATE,
    payload: clientState
});