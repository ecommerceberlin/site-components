
// import { ssrCache as cache } from '../server/cache'
import { END } from 'redux-saga';
import {resourceFetchRequest} from '../components/redux/actions'
import {setSettings} from '../settings/redux/actions'
import {changeLocale} from '../i18n'

async function configure(props, config){

  const store = "store" in props ? props.store : props;

  const {settings, preload} = config

  const state = store.getState();

  if(settings){
    store.dispatch(setSettings(settings))
  }

  if(preload && Array.isArray(preload)){
    store.dispatch(resourceFetchRequest(preload))
  }

  if("locale" in props || "defaultLocale" in props ){
    changeLocale(props.locale || props.defaultLocale)
  }

  store.dispatch(END)

  await store.sagaTask.toPromise()

}

export  {configure};

