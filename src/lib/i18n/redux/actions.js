import * as Types from './types'


export function changeLocale(locale) {
      
     if(locale && locale.length == 2){
        return {
          type: Types.CHANGE_LOCALE,
          locale: locale
        };
     }
  }
  
  export function fetchTranslations(){
    return {
        type: Types.TRANSLATIONS_FETCH_REQUEST
    }
  }

  export function replaceTranslations(texts){
    return{ 
        type: Types.CHANGE_LOCALE_MSGS, 
        messages: texts 
    }
  }

