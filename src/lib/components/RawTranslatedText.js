import React from 'react';
import {translate} from '../i18n'

const RawTranslatedText = ({label, translate, locale, defaultLanguage, ...rest}) => {

  //example:  rest = {pl: undefined, en : undefined}

    if(label) {
       return translate(label)
    }

    if(Object.keys(rest).length && locale && locale in rest && rest[locale]){
        return rest[locale]
    }

    return defaultLanguage in rest && rest[defaultLanguage] ? rest[defaultLanguage] : "_untranslated_"
}

RawTranslatedText.defaultProps = {
    defaultLanguage : "en"
}

export default translate(RawTranslatedText)