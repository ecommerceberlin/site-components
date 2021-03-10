
// import { ssrCache as cache } from '../server/cache'
import { END } from 'redux-saga';
import {resourceFetchRequest} from '../components/redux/actions'
import {setSettings} from '../settings/redux/actions'
import {changeLocale} from '../i18n'
import get from 'lodash/get'

async function configure(props, config){

  /**
   *  we should pass props if we want to handle new locale properly
   * */
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
  }else{
    //falback?
    changeLocale( get((settings || {}), "system.default_locale", `${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}`)  )
  }

  store.dispatch(END)

  await store.sagaTask.toPromise()

  return {
    props: "params" in props? props.params: {},
    revalidate: 10
  }

}

export  {configure};

