
// import { ssrCache as cache } from '../server/cache'
import { END } from 'redux-saga';
import {resourceFetchRequest} from '../components/redux/actions'
import {setSettings} from '../settings/redux/actions'
import {changeLocale} from '../i18n'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'

async function configure(props, config){

  const project = `${process.env.NEXT_PUBLIC_PROJECT}`

  if(!project || project.length < 5 || !project.includes(".")){
    throw 'NEXT_PUBLIC_PROJECT missing!';
  }
  /**
   *  we should pass props if we want to handle new locale properly
   * */
  const store = "store" in props ? props.store : props;

  const {settings, preload, cache, externalSettings} = config

  if(isEmpty(settings) || !("system" in settings)){
    throw 'SETTINGS required';
  }

  if(!("getState" in store)){
    throw 'STORE required';
  }

  // const state = store.getState();

  if(externalSettings && Array.isArray(externalSettings)){

    Promise.allSettled(externalSettings.map(arr => fetch(arr).then(response => response.json()))).then(data => {
      const obj = {}
      data.forEach((p, i)=> {
        if(p.status == "fulfilled"){
          obj[externalSettings[i]] = p.value
        }
      })
      store.dispatch(setSettings(obj))
    })
  }

  if(settings){
    store.dispatch(setSettings(settings))
  }

  if(preload && !isEmpty(preload) && Array.isArray(preload)){
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
    revalidate: cache || 30
  }

}

export  {configure};

