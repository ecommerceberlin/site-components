
import { ssrCache as cache } from '../server/cache'
import { END } from 'redux-saga';
import {resourceFetchRequest} from '../components/redux/actions'
import {setSettings} from '../settings/redux/actions'


async function configure(store, config){

  const {settings, preload} = config

  const state = store.getState();

  if(settings){
    store.dispatch(setSettings(settings))
  }

  if(preload && Array.isArray(preload)){
    store.dispatch(resourceFetchRequest(preload))
  }

  store.dispatch(END)

  await store.sagaTask.toPromise()

}



  export  {configure};
